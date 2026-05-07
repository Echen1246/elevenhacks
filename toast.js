/* === WDToast — agent action confirmations ===
   Pops a brutalist toast in top-right when the voice agent triggers a tool.
*/
(function () {
  let host = null;
  let nextId = 0;

  function ensureHost() {
    if (host) return host;
    host = document.createElement('div');
    host.id = 'wd-toast-host';
    host.style.cssText = `
      position: fixed; top: 24px; right: 24px; z-index: 300;
      display: flex; flex-direction: column; gap: 12px;
      pointer-events: none;
    `;
    document.body.appendChild(host);
    return host;
  }

  function show({ icon, title, body, duration = 5500 }) {
    const h = ensureHost();
    const id = ++nextId;
    const el = document.createElement('div');
    el.dataset.id = id;
    el.style.cssText = `
      pointer-events: auto;
      background: var(--wd-paper, #fafaf5);
      color: var(--wd-ink, #0a0a0a);
      border: 1px solid var(--wd-ink, #0a0a0a);
      box-shadow: 6px 6px 0 #ff5722;
      padding: 16px 20px;
      min-width: 320px; max-width: 420px;
      font-family: var(--font-sans, system-ui);
      transform: translateX(120%);
      transition: transform .4s cubic-bezier(.2,.8,.2,1);
      display: grid; grid-template-columns: 28px 1fr; gap: 12px; align-items: start;
    `;
    el.innerHTML = `
      <div style="font-size: 20px; line-height: 1;">${icon || '✓'}</div>
      <div>
        <div style="font-family: var(--font-mono, monospace); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: var(--wd-mute, #888); margin-bottom: 6px;">Voice action · just now</div>
        <div style="font-size: 15px; font-weight: 500; letter-spacing: -0.01em; margin-bottom: 4px;">${title}</div>
        <div style="font-family: var(--font-serif, Georgia); font-style: italic; font-size: 14px; line-height: 1.4; color: var(--wd-ink-2, #333);">${body || ''}</div>
      </div>
    `;
    h.appendChild(el);
    requestAnimationFrame(() => { el.style.transform = 'translateX(0)'; });
    setTimeout(() => {
      el.style.transform = 'translateX(120%)';
      setTimeout(() => el.remove(), 400);
    }, duration);
  }

  window.WDToast = { show };
})();
