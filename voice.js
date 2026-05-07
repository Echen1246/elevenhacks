/* === Workday voice bubble — custom UI driven by ElevenLabs React SDK ===
   Uses @elevenlabs/client (vanilla — no React deps) for full control:
   - Custom round bubble with real-time mic waveform
   - Idle / connecting / listening / thinking / speaking states
   - Position: center | right | mini  (cycle button)
   - Replaces the default ElevenLabs embed widget entirely
*/

const WD_AGENT_ID = 'agent_8201kr0x09dsfh1a88a1y8zexc5y';

// Lazy-load the ESM client
let _convaiPromise = null;
function loadConvai() {
  if (_convaiPromise) return _convaiPromise;
  _convaiPromise = import('https://esm.sh/@elevenlabs/client@0.5.0').then(m => m);
  return _convaiPromise;
}

window.WDVoice = (function () {
  let conversation = null;
  let state = 'idle'; // idle | connecting | listening | speaking
  let analyser = null;
  let audioCtx = null;
  let micStream = null;
  let agentAudioLevel = 0;
  let micLevels = new Array(28).fill(0);
  let agentLevels = new Array(28).fill(0);
  let rafId = null;
  let lastCaption = '';

  function $(sel) { return document.querySelector(sel); }

  function setState(s) {
    state = s;
    render();
  }

  function setCaption(text) {
    lastCaption = text;
    const el = $('.wdv-caption');
    if (el) el.textContent = text;
  }

  function pos() { return localStorage.getItem('wd_voice_pos') || 'center'; }
  function setPos(p) { localStorage.setItem('wd_voice_pos', p); render(); }
  function nextPos(p) { return p === 'center' ? 'right' : p === 'right' ? 'mini' : 'center'; }

  // ============================================================
  // Mic waveform — capture user mic stream once at session start
  // ============================================================
  async function startMicAnalysis() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      // Reuse mic stream the SDK already grabbed if possible — otherwise grab our own
      if (!micStream) {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      const src = audioCtx.createMediaStreamSource(micStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      src.connect(analyser);
    } catch (e) {
      console.warn('mic analysis failed', e);
    }
  }

  function stopMicAnalysis() {
    if (micStream) {
      micStream.getTracks().forEach(t => t.stop());
      micStream = null;
    }
    if (audioCtx) {
      try { audioCtx.close(); } catch (e) {}
      audioCtx = null;
    }
    analyser = null;
    cancelAnimationFrame(rafId);
    micLevels.fill(0); agentLevels.fill(0);
    drawWave();
  }

  function tick() {
    // Sample mic
    let micPeak = 0;
    if (analyser && state !== 'idle') {
      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const v = (data[i] - 128) / 128;
        sum += v * v;
      }
      micPeak = Math.min(1, Math.sqrt(sum / data.length) * 3.5);
    }
    micLevels.shift();
    micLevels.push(micPeak);

    // Sample agent (from getOutputByteFrequencyData if available)
    let agentPeak = 0;
    if (conversation && state === 'speaking') {
      try {
        // Some SDK versions expose getOutputByteFrequencyData
        const arr = conversation.getOutputByteFrequencyData?.();
        if (arr && arr.length) {
          let sum = 0;
          for (let i = 0; i < arr.length; i++) sum += arr[i];
          agentPeak = Math.min(1, (sum / arr.length / 255) * 2.5);
        } else {
          // Fallback: synth a level
          agentPeak = 0.3 + Math.random() * 0.5;
        }
      } catch (e) {
        agentPeak = 0.4 + Math.random() * 0.4;
      }
    }
    agentLevels.shift();
    agentLevels.push(agentPeak);

    drawWave();
    rafId = requestAnimationFrame(tick);
  }

  function drawWave() {
    const canvas = $('.wdv-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width = canvas.clientWidth * dpr;
    const h = canvas.height = canvas.clientHeight * dpr;
    ctx.clearRect(0, 0, w, h);

    const isDark = document.documentElement.classList.contains('dark');
    const userColor = isDark ? '#fafaf5' : '#0a0a0a';
    const agentColor = '#ff5722';
    const color = state === 'speaking' ? agentColor : userColor;
    const levels = state === 'speaking' ? agentLevels : micLevels;

    // ChatGPT-style smooth waveform: filled symmetric blob with cubic curves
    const N = levels.length;
    const cy = h / 2;
    const stepX = w / (N - 1);

    // Compute smoothed amplitudes (simple moving average)
    const amp = new Array(N);
    for (let i = 0; i < N; i++) {
      let s = 0, c = 0;
      for (let k = -2; k <= 2; k++) {
        const j = i + k;
        if (j >= 0 && j < N) { s += levels[j]; c++; }
      }
      const v = c ? s / c : 0;
      // Window the edges so it tapers like a pill, plus minimum baseline
      const edge = Math.sin((i / (N - 1)) * Math.PI); // 0 at edges, 1 in middle
      const minH = 0.08; // always have a subtle baseline
      amp[i] = Math.max(minH, v) * edge * 0.92;
    }

    // Build top path
    ctx.beginPath();
    ctx.moveTo(0, cy);
    for (let i = 0; i < N - 1; i++) {
      const x0 = i * stepX, x1 = (i + 1) * stepX;
      const y0 = cy - amp[i] * h * 0.5;
      const y1 = cy - amp[i + 1] * h * 0.5;
      const cx = (x0 + x1) / 2;
      ctx.bezierCurveTo(cx, y0, cx, y1, x1, y1);
    }
    // Mirror to bottom
    for (let i = N - 1; i > 0; i--) {
      const x0 = i * stepX, x1 = (i - 1) * stepX;
      const y0 = cy + amp[i] * h * 0.5;
      const y1 = cy + amp[i - 1] * h * 0.5;
      const cx = (x0 + x1) / 2;
      ctx.bezierCurveTo(cx, y0, cx, y1, x1, y1);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  // ============================================================
  // Session control
  // ============================================================
  function buildEmployeeContext() {
    const e = (window.WD && window.WD.current()) || null;
    if (!e) return {};
    const v = e.pto?.vacation || {};
    const s = e.pto?.sick || {};
    const pers = e.pto?.personal || {};
    const pendingTimeOff = (e.timeOffRequests || []).filter(r => r.status === 'Pending').length;
    const apps = e.jobs?.applications || [];
    return {
      employee_name: `${e.firstName} ${e.lastName}`,
      employee_first_name: e.firstName,
      employee_title: e.title,
      employee_dept: e.dept,
      employee_manager: e.manager,
      employee_location: e.location,
      employee_id: e.employeeId,
      employee_start_date: e.startDate,
      vacation_days_remaining: String(v.balance ?? 0),
      vacation_days_used: String(v.used ?? 0),
      vacation_days_total: String(v.total ?? 0),
      sick_days_remaining: String(s.balance ?? 0),
      personal_days_remaining: String(pers.balance ?? 0),
      next_pay_date: e.nextPay?.date || '',
      next_pay_amount: e.nextPay?.amount ? `$${e.nextPay.amount.toLocaleString()}` : '',
      annual_salary: e.salary ? `$${e.salary.toLocaleString()}` : '',
      health_plan: e.benefits?.health?.plan || '',
      health_tier: e.benefits?.health?.tier || '',
      retirement_balance: e.benefits?.retirement?.balance ? `$${Math.round(e.benefits.retirement.balance).toLocaleString()}` : '',
      retirement_contribution_pct: String(e.benefits?.retirement?.contribution ?? ''),
      retirement_match_pct: String(e.benefits?.retirement?.match ?? ''),
      hsa_balance: e.benefits?.hsa?.balance ? `$${e.benefits.hsa.balance.toLocaleString()}` : '',
      pending_time_off_requests: String(pendingTimeOff),
      open_tasks: String((e.tasks || []).length),
      job_applications_count: String(apps.length),
      job_applications_summary: apps.map(a => `${a.title} (${a.status})`).join('; ') || 'none',
      goals_count: String((e.goals || []).length),
      todays_schedule: (e.schedule || []).map(s => `${s.time} ${s.title}`).join('; ') || 'nothing scheduled',
      unread_messages: String((e.messages || []).filter(m => m.unread).length),
    };
  }

  async function start() {
    if (state !== 'idle') return;
    setState('connecting');
    setCaption('Connecting…');
    try {
      const { Conversation } = await loadConvai();
      // Get mic first so analyser is ready
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = buildEmployeeContext();

      conversation = await Conversation.startSession({
        agentId: WD_AGENT_ID,
        connectionType: 'websocket',
        dynamicVariables: ctx,
        clientTools: {
          submit_time_off: async ({ start_date, end_date, days, type }) => {
            window.WDToast?.show({
              icon: '🌴',
              title: `${type || 'Time off'} request submitted`,
              body: `${days || '?'} day(s) — ${start_date} → ${end_date}. Pending manager approval.`,
            });
            return `Submitted ${days} day ${type || 'vacation'} request from ${start_date} to ${end_date}. Sent to manager for approval.`;
          },
          update_w4: async ({ allowances, additional_withholding }) => {
            window.WDToast?.show({
              icon: '📋',
              title: 'W-4 updated',
              body: `Allowances: ${allowances ?? 'unchanged'}, additional withholding: $${additional_withholding ?? '0'}.`,
            });
            return `W-4 updated. Effective next pay period.`;
          },
          update_401k_contribution: async ({ contribution_percent }) => {
            window.WDToast?.show({
              icon: '💰',
              title: '401(k) contribution updated',
              body: `New rate: ${contribution_percent}%. Effective next pay period.`,
            });
            return `401(k) contribution changed to ${contribution_percent}%.`;
          },
          submit_expense: async ({ vendor, amount, category }) => {
            window.WDToast?.show({
              icon: '🧾',
              title: 'Expense submitted',
              body: `${vendor} · $${amount} · ${category}`,
            });
            return `Expense submitted: $${amount} at ${vendor} (${category}).`;
          },
          navigate_to: async ({ section }) => {
            const valid = ['home','pay','timeoff','benefits','expenses','career','team','tasks','learning','documents','messages'];
            const target = valid.includes(section) ? section : 'home';
            location.hash = target;
            return `Opened ${target}.`;
          },
        },
        onConnect: () => { setState('listening'); setCaption('Listening… ask me anything.'); },
        onDisconnect: () => { setState('idle'); setCaption(''); stopMicAnalysis(); conversation = null; },
        onStatusChange: (s) => { console.log('[voice] status', s); },
        onModeChange: (mode) => {
          console.log('[voice] mode', mode);
          if (mode?.mode === 'speaking') { setState('speaking'); }
          else if (mode?.mode === 'listening') { setState('listening'); }
        },
        onMessage: (msg) => {
          console.log('[voice] msg', msg);
          if (msg?.source === 'user' && msg.message) setCaption('You: ' + msg.message);
          else if (msg?.source === 'ai' && msg.message) setCaption(msg.message);
        },
        onError: (err) => {
          console.error('voice error', err);
          setCaption('Connection error. Tap to retry.');
          setState('idle');
        },
      });
      // Wire mic analysis using the stream we already have
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const src = audioCtx.createMediaStreamSource(micStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      src.connect(analyser);
      tick();
    } catch (e) {
      console.error(e);
      setCaption('Mic permission denied or connection failed.');
      setState('idle');
      stopMicAnalysis();
    }
  }

  async function stop() {
    if (conversation) {
      try { await conversation.endSession(); } catch (e) {}
      conversation = null;
    }
    setState('idle');
    setCaption('');
    stopMicAnalysis();
  }

  // ============================================================
  // Render
  // ============================================================
  function render() {
    let root = document.getElementById('wd-voice-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'wd-voice-root';
      document.body.appendChild(root);
    }

    // Remove the official ElevenLabs widget if anyone mounted it
    document.querySelectorAll('elevenlabs-convai').forEach(el => el.remove());

    const p = pos();
    const employee = (window.WD && window.WD.current()) || { firstName: 'there' };
    const isMini = p === 'mini';

    // State styling
    const stateLabel = {
      idle: 'Workday Assistant',
      connecting: 'Connecting…',
      listening: 'Listening',
      speaking: 'Speaking',
    }[state];

    const accent = state === 'idle' ? 'transparent'
                 : state === 'connecting' ? '#fbbf24'
                 : state === 'listening' ? '#16a34a'
                 : '#ff5722';

    root.className = 'wdv-dock ' + p + (state !== 'idle' ? ' active' : '');

    root.innerHTML = `
      <div class="wdv-bubble state-${state}">
        <button class="wdv-orb" title="${state === 'idle' ? 'Tap to talk' : 'Tap to stop'}">
          <span class="wdv-orb-pulse"></span>
          <span class="wdv-orb-pulse delay"></span>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${state === 'idle' || state === 'connecting'
              ? '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><line x1="12" y1="18" x2="12" y2="22"/>'
              : '<rect x="6" y="6" width="12" height="12"/>'}
          </svg>
        </button>
      </div>
    `;

    const orb = root.querySelector('.wdv-orb');
    orb?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isMini) { setPos('center'); return; }
      if (state === 'idle') start();
      else stop();
    });

    root.querySelector('.wdv-pos')?.addEventListener('click', (e) => {
      e.stopPropagation();
      setPos(nextPos(p));
    });

    if (state !== 'idle') drawWave();
  }

  function mount() { render(); }

  function setPosition(p) { setPos(p); }

  // Auto-mount
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  return { mount, start, stop, setPosition };
})();
