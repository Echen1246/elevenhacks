/* === All 10 modules — Workday app screens === */

const fmt = window.WD.fmt;

// === Shared bits ===
const PageHeader = ({ num, title, sub, action }) => (
  <div style={{ marginBottom: 40 }}>
    <div className="row between" style={{ alignItems: 'baseline' }}>
      <div className="eb">№ {num} — Section</div>
      {action}
    </div>
    <h1 style={{ fontSize: 88, fontWeight: 300, letterSpacing: '-0.05em', lineHeight: 0.92, margin: '16px 0 12px' }}>
      {title}
    </h1>
    {sub && <p className="serif" style={{ fontSize: 22, color: 'var(--wd-ink-2)', maxWidth: '50ch', margin: 0, lineHeight: 1.4, fontStyle: 'italic' }}>{sub}</p>}
  </div>
);

const TONE_BG = {
  bad: '#fee2e2', warn: '#ffedd5', good: '#dcfce7', neutral: 'transparent',
};
const TONE_INK = {
  bad: '#991b1b', warn: '#9a3412', good: '#166534', neutral: 'var(--wd-ink)',
};
const TONE_TAG = {
  bad: { bg: '#dc2626', fg: '#fff', label: 'URGENT' },
  warn: { bg: '#f97316', fg: '#fff', label: 'ON HOLD' },
  good: { bg: '#16a34a', fg: '#fff', label: 'ON TRACK' },
};

const StatCells = ({ stats }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, borderTop: '1px solid var(--wd-line)', borderBottom: '1px solid var(--wd-line)', margin: '40px 0' }}>
    {stats.map((s, i) => {
      const tone = s.tone || 'neutral';
      const tag = TONE_TAG[tone];
      return (
        <div key={i} style={{
          padding: '24px 28px 24px 24px',
          borderRight: i < stats.length - 1 ? '1px solid var(--wd-line)' : 'none',
          background: TONE_BG[tone],
          color: TONE_INK[tone],
          position: 'relative',
        }}>
          <div className="row between" style={{ alignItems: 'baseline' }}>
            <div className="eb" style={{ color: tone === 'neutral' ? undefined : TONE_INK[tone], opacity: tone === 'neutral' ? undefined : 0.75 }}>{s.label}</div>
            {tag && (
              <span style={{
                background: tag.bg, color: tag.fg, padding: '2px 6px',
                fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em',
                fontWeight: 600,
              }}>{tag.label}</span>
            )}
          </div>
          <div className="bignum" style={{ fontSize: 64, marginTop: 14, color: TONE_INK[tone] }}>{s.value}</div>
          {s.sub && <div style={{ fontSize: 13, marginTop: 10, color: tone === 'neutral' ? 'var(--wd-mute)' : TONE_INK[tone], opacity: tone === 'neutral' ? 1 : 0.8 }} className="serif italic">{s.sub}</div>}
        </div>
      );
    })}
  </div>
);

const SectionHead = ({ num, label, right }) => (
  <div className="row between" style={{ alignItems: 'baseline', margin: '40px 0 16px' }}>
    <div className="eb">{num ? `${num} / ` : ''}{label}</div>
    {right}
  </div>
);

// =================================================================
// 01 HOME
// =================================================================
const Home = ({ employee, go }) => {
  const e = employee;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
  const tasksOverdue = e.tasks.filter(t => t.priority === 'overdue').length;
  const tasksHigh = e.tasks.filter(t => t.priority === 'high').length;
  const tasksUrgent = tasksOverdue + tasksHigh;
  const goalsOnTrack = e.goals.filter(g => g.status === 'In progress' || g.status === 'Done').length;
  const onHoldApps = e.jobs.applications.filter(j => j.status === 'Awaiting response' || j.status === 'In review').length;
  const interviewing = e.jobs.applications.filter(j => j.stage === 'Interview').length;

  // Priority-based hero summary
  const headlineCount = tasksOverdue || tasksHigh;
  const headlineNoun = tasksOverdue ? (tasksOverdue === 1 ? 'item is overdue' : 'items are overdue')
                     : tasksHigh ? (tasksHigh === 1 ? 'item needs attention' : 'items need attention')
                     : 'all caught up';

  return (
    <div>
      {/* Hero — priority-led */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'end', padding: '0 0 36px', borderBottom: '1px solid var(--wd-line)' }}>
        <div>
          <div className="eb">№ 047 · Dashboard · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          <h1 style={{ fontSize: 96, fontWeight: 300, letterSpacing: '-0.05em', lineHeight: 0.92, margin: '20px 0 0' }}>
            Good <em className="serif-it">{greeting}</em>,<br/>{e.firstName}.
          </h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--wd-line)' }}>
          <div style={{ padding: '14px 16px', borderRight: '1px solid var(--wd-line)', background: tasksOverdue ? '#fee2e2' : tasksHigh ? '#ffedd5' : '#dcfce7' }}>
            <div className="eb" style={{ fontSize: 9 }}>Action items</div>
            <div style={{ fontSize: 28, fontWeight: 500, marginTop: 4, color: tasksOverdue ? '#991b1b' : tasksHigh ? '#9a3412' : '#166534' }}>{headlineCount || '—'}</div>
            <div style={{ fontSize: 11, marginTop: 2, color: tasksOverdue ? '#991b1b' : tasksHigh ? '#9a3412' : '#166534' }} className="serif italic">{headlineNoun}</div>
          </div>
          <div style={{ padding: '14px 16px', borderRight: '1px solid var(--wd-line)' }}>
            <div className="eb" style={{ fontSize: 9 }}>Today</div>
            <div style={{ fontSize: 28, fontWeight: 500, marginTop: 4 }}>{e.schedule.length}</div>
            <div style={{ fontSize: 11, color: 'var(--wd-mute)', marginTop: 2 }} className="serif italic">meetings scheduled</div>
          </div>
          <div style={{ padding: '14px 16px' }}>
            <div className="eb" style={{ fontSize: 9 }}>Unread</div>
            <div style={{ fontSize: 28, fontWeight: 500, marginTop: 4 }}>{(e.messages || []).filter(m => !m.read).length || 0}</div>
            <div style={{ fontSize: 11, color: 'var(--wd-mute)', marginTop: 2 }} className="serif italic">messages</div>
          </div>
        </div>
      </div>

      {/* Tier 1 — what needs your attention */}
      <div style={{ marginTop: 32 }}>
        <SectionHead num="01" label="Needs your attention"/>
        <StatCells stats={[
          {
            label: 'Pending tasks',
            value: String(e.tasks.length).padStart(2, '0'),
            sub: tasksOverdue ? `${tasksOverdue} overdue` : tasksHigh ? `${tasksHigh} high priority` : 'all clear',
            tone: tasksOverdue ? 'bad' : tasksHigh ? 'warn' : 'good',
          },
          {
            label: 'Approvals',
            value: String((e.tasks.filter(t => t.type === 'approval') || []).length || 0).padStart(2, '0'),
            sub: 'awaiting your sign-off',
            tone: ((e.tasks.filter(t => t.type === 'approval') || []).length > 0) ? 'warn' : 'neutral',
          },
          {
            label: 'Reviews due',
            value: e.review && e.review.daysUntil ? String(e.review.daysUntil) : '—',
            sub: e.review ? `${e.review.period} cycle` : 'no review',
            tone: e.review && e.review.daysUntil < 14 ? 'warn' : 'neutral',
          },
          {
            label: 'Apps in review',
            value: String(onHoldApps).padStart(2, '0'),
            sub: interviewing ? `${interviewing} interviewing` : 'awaiting response',
            tone: onHoldApps ? 'warn' : 'neutral',
          },
        ]}/>
      </div>

      {/* Task list + Today */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', borderTop: '1px solid var(--wd-line)', borderBottom: '1px solid var(--wd-line)' }}>
        <div className="lined-cell">
          <div className="row between" style={{ alignItems: 'baseline' }}>
            <div className="eb">On your desk — by priority</div>
            <span className="eb" onClick={() => go('tasks')} style={{ cursor: 'pointer' }}>view all →</span>
          </div>
          <div style={{ marginTop: 18 }}>
            {[...e.tasks].sort((a, b) => {
              const order = { overdue: 0, high: 1, medium: 2, low: 3 };
              return (order[a.priority] ?? 4) - (order[b.priority] ?? 4);
            }).slice(0, 5).map((t, i) => {
              const tag = t.priority === 'overdue' ? { bg: '#dc2626', fg: '#fff', label: 'OVERDUE' }
                        : t.priority === 'high'    ? { bg: '#f97316', fg: '#fff', label: 'HIGH' }
                        : t.priority === 'medium'  ? { bg: '#fef3c7', fg: '#854d0e', label: 'MED' }
                        : { bg: '#f3f4f6', fg: '#374151', label: 'LOW' };
              return (
                <div key={t.id} onClick={() => go('tasks')}
                  style={{ display: 'grid', gridTemplateColumns: '32px 80px 1fr auto', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--wd-line-soft)', gap: 14, cursor: 'pointer' }}>
                  <div className="idx">{String(i + 1).padStart(2, '0')}</div>
                  <span style={{
                    background: tag.bg, color: tag.fg, padding: '3px 7px',
                    fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', fontWeight: 600,
                    textAlign: 'center',
                  }}>{tag.label}</span>
                  <div style={{ fontSize: 16 }}>{t.title}</div>
                  <div className="eb" style={{ color: 'var(--wd-mute)' }}>{t.age}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lined-cell" style={{ borderRight: 'none' }}>
          <div className="eb">Today's schedule</div>
          <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.7 }}>
            {e.schedule.length === 0 && <div className="serif italic" style={{ color: 'var(--wd-mute)' }}>No meetings today.</div>}
            {e.schedule.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', padding: '10px 0', borderBottom: '1px solid var(--wd-line-soft)', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--wd-mute)' }}>{s.time}</span>
                <span style={{ fontSize: 14 }}>{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tier 2 — financials & growth */}
      <div style={{ marginTop: 40 }}>
        <SectionHead num="02" label="Financials & growth"/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid var(--wd-line)', borderBottom: '1px solid var(--wd-line)' }}>
          <div className="lined-cell" onClick={() => go('pay')} style={{ cursor: 'pointer' }}>
            <div className="row between"><div className="eb">Next pay</div><span style={{ background: '#dcfce7', color: '#166534', padding: '2px 6px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', fontWeight: 600 }}>SCHEDULED</span></div>
            <div className="bignum" style={{ fontSize: 52, marginTop: 16 }}>{fmt.moneyShort(e.nextPay.amount)}</div>
            <div style={{ fontSize: 13, color: 'var(--wd-mute)', marginTop: 8 }} className="serif italic">{fmt.date(e.nextPay.date)}</div>
            <div className="rule-soft" style={{ margin: '20px 0 14px' }}/>
            <div className="row between" style={{ fontSize: 12 }}>
              <span style={{ color: 'var(--wd-mute)' }} className="serif italic">YTD gross</span>
              <span>{fmt.moneyShort(e.salary * 0.4)}</span>
            </div>
          </div>

          <div className="lined-cell" onClick={() => go('benefits')} style={{ cursor: 'pointer' }}>
            <div className="row between"><div className="eb">401(k)</div><span style={{ background: '#dcfce7', color: '#166534', padding: '2px 6px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', fontWeight: 600 }}>ON TRACK</span></div>
            <div className="bignum" style={{ fontSize: 52, marginTop: 16 }}>{fmt.moneyShort(e.benefits.retirement.balance)}</div>
            <div style={{ fontSize: 13, color: 'var(--wd-mute)', marginTop: 8 }} className="serif italic">{e.benefits.retirement.contribution}% · {e.benefits.retirement.match}% match</div>
            <div style={{ marginTop: 18 }}>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${(e.benefits.retirement.contribution / 15) * 100}%`, background: '#16a34a' }}/></div>
              <div className="row between" style={{ marginTop: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--wd-mute)' }}>YOU</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--wd-mute)' }}>IRS LIMIT</span>
              </div>
            </div>
          </div>

          <div className="lined-cell" onClick={() => go('timeoff')} style={{ borderRight: 'none', cursor: 'pointer' }}>
            <div className="row between">
              <div className="eb">Time off — vacation</div>
              <span style={{ background: e.pto.vacation.balance < 5 ? '#fee2e2' : '#dcfce7', color: e.pto.vacation.balance < 5 ? '#991b1b' : '#166534', padding: '2px 6px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', fontWeight: 600 }}>{e.pto.vacation.balance < 5 ? 'LOW' : 'HEALTHY'}</span>
            </div>
            <div className="bignum" style={{ fontSize: 52, marginTop: 16 }}>{e.pto.vacation.balance}<span style={{ fontSize: 24, color: 'var(--wd-mute)' }}> / {e.pto.vacation.total}</span></div>
            <div style={{ fontSize: 13, color: 'var(--wd-mute)', marginTop: 8 }} className="serif italic">days remaining this year</div>
            <div className="rule-soft" style={{ margin: '20px 0 14px' }}/>
            <div className="row between" style={{ fontSize: 12 }}>
              <span style={{ color: 'var(--wd-mute)' }} className="serif italic">Sick days</span>
              <span>{e.pto.sick.balance} of {e.pto.sick.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 3 — career */}
      <div style={{ marginTop: 40 }}>
        <SectionHead num="03" label="Career & development"/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid var(--wd-line)', borderBottom: '1px solid var(--wd-line)' }}>
          <div className="lined-cell" onClick={() => go('career')} style={{ cursor: 'pointer' }}>
            <div className="row between">
              <div className="eb">Goals — {e.review.period}</div>
              <span style={{ background: goalsOnTrack === e.goals.length ? '#dcfce7' : '#ffedd5', color: goalsOnTrack === e.goals.length ? '#166534' : '#9a3412', padding: '2px 6px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', fontWeight: 600 }}>
                {goalsOnTrack === e.goals.length ? 'ALL ON TRACK' : `${e.goals.length - goalsOnTrack} BEHIND`}
              </span>
            </div>
            <div className="bignum" style={{ fontSize: 52, marginTop: 16 }}>{goalsOnTrack}<span style={{ fontSize: 24, color: 'var(--wd-mute)' }}> / {e.goals.length}</span></div>
            <div style={{ marginTop: 18 }}>
              {e.goals.slice(0, 3).map((g, i) => {
                const dot = g.status === 'Done' ? '#16a34a' : g.status === 'In progress' ? '#f97316' : '#dc2626';
                return (
                  <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid var(--wd-line-soft)', display: 'grid', gridTemplateColumns: '10px 1fr auto', gap: 10, alignItems: 'center', fontSize: 14 }}>
                    <span style={{ width: 8, height: 8, background: dot, borderRadius: '50%' }}/>
                    <span>{g.title}</span>
                    <span className="serif italic" style={{ color: 'var(--wd-mute)', fontSize: 12 }}>{g.status}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lined-cell" onClick={() => go('career')} style={{ borderRight: 'none', cursor: 'pointer' }}>
            <div className="row between">
              <div className="eb">Internal mobility</div>
              <span className="eb" style={{ color: 'var(--wd-mute)' }}>→</span>
            </div>
            <div className="bignum" style={{ fontSize: 52, marginTop: 16 }}>{e.jobs.applications.length}<span style={{ fontSize: 20, color: 'var(--wd-mute)' }}> active</span></div>
            <div style={{ fontSize: 13, color: 'var(--wd-mute)', marginTop: 4 }} className="serif italic">{e.jobs.saved} saved · {e.jobs.viewed} viewed</div>
            <div style={{ marginTop: 18 }}>
              {e.jobs.applications.slice(0, 3).map((j, i) => {
                const tag = j.stage === 'Interview' ? { bg: '#dcfce7', fg: '#166534', label: 'INTERVIEW' }
                          : j.status === 'Awaiting response' ? { bg: '#ffedd5', fg: '#9a3412', label: 'ON HOLD' }
                          : { bg: '#f3f4f6', fg: '#374151', label: 'IN REVIEW' };
                return (
                  <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid var(--wd-line-soft)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'center', fontSize: 14 }}>
                    <span>{j.title}</span>
                    <span style={{ background: tag.bg, color: tag.fg, padding: '2px 6px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', fontWeight: 600 }}>{tag.label}</span>
                  </div>
                );
              })}
              {e.jobs.applications.length === 0 && <div className="serif italic" style={{ color: 'var(--wd-mute)', padding: '10px 0' }}>No active applications.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// 02 PAY
// =================================================================
const Pay = ({ employee }) => {
  const e = employee;
  return (
    <div>
      <PageHeader num="002" title={<>Your <em className="serif-it">pay.</em></>}
        sub={`Next deposit ${fmt.date(e.nextPay.date)}.`}
        action={<button className="btn sm">Download W-2</button>}/>

      <StatCells stats={[
        { label: 'Annual salary', value: fmt.moneyShort(e.salary), sub: 'gross, before tax' },
        { label: 'Next pay (net)', value: fmt.moneyShort(e.nextPay.amount), sub: fmt.date(e.nextPay.date) },
        { label: 'YTD gross', value: fmt.moneyShort(e.salary * 0.4), sub: '4 of 10 periods' },
        { label: 'Last bonus', value: fmt.moneyShort(e.bonus.lastYear), sub: `next eligible ${fmt.date(e.bonus.eligibleNext)}` },
      ]}/>

      <SectionHead num="01" label="Pay history"/>
      <table className="tbl">
        <thead><tr><th>Pay date</th><th>Gross</th><th>Taxes</th><th>Deductions</th><th>Net</th><th></th></tr></thead>
        <tbody>
          {e.payslips.map((p, i) => (
            <tr key={i}>
              <td>{fmt.date(p.date)}</td>
              <td>{fmt.money(p.gross)}</td>
              <td className="muted">−{fmt.money(p.taxes)}</td>
              <td className="muted">−{fmt.money(p.deductions)}</td>
              <td><strong>{fmt.money(p.net)}</strong></td>
              <td style={{ textAlign: 'right' }}><a className="eb" href="#" style={{ color: 'var(--wd-ink)' }}>View payslip ↗</a></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderTop: '1px solid var(--wd-line)', borderBottom: '1px solid var(--wd-line)', marginTop: 40 }}>
        <div className="lined-cell">
          <div className="eb">Direct deposit</div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 18 }} className="serif italic">Chase Bank · Checking</div>
            <div style={{ fontSize: 14, color: 'var(--wd-mute)', marginTop: 6 }}>•••• 4829 · 100% of net</div>
            <button className="btn sm" style={{ marginTop: 16 }}>Update account</button>
          </div>
        </div>
        <div className="lined-cell" style={{ borderRight: 'none' }}>
          <div className="eb">Tax withholdings</div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>
              <div className="row between"><span>Federal</span><strong>Single, 0 dep.</strong></div>
              <div className="row between"><span>State</span><strong>{e.location.split(',')[1]?.trim() || 'NY'}</strong></div>
              <div className="row between"><span>Additional withholding</span><strong>$0</strong></div>
            </div>
            <button className="btn sm" style={{ marginTop: 16 }}>Update W-4</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// 03 TIME OFF
// =================================================================
const TimeOff = ({ employee }) => {
  const e = employee;
  return (
    <div>
      <PageHeader num="003" title={<>Time <em className="serif-it">off.</em></>}
        sub={`${e.pto.vacation.balance} vacation days remain — that's about ${Math.round(e.pto.vacation.balance / 5)} weeks.`}
        action={<button className="btn primary sm">Request time off →</button>}/>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--wd-line)', borderBottom: '1px solid var(--wd-line)', marginBottom: 40 }}>
        {[
          { label: 'Vacation', d: e.pto.vacation, color: 'var(--wd-ink)' },
          { label: 'Sick', d: e.pto.sick, color: 'var(--wd-mute)' },
          { label: 'Personal', d: e.pto.personal, color: 'var(--wd-warn)' },
        ].map((p, i) => (
          <div key={i} className="lined-cell" style={{ borderRight: i < 2 ? '1px solid var(--wd-line)' : 'none', borderBottom: 'none' }}>
            <div className="eb">{p.label}</div>
            <div className="bignum" style={{ fontSize: 80, marginTop: 14 }}>{p.d.balance}</div>
            <div style={{ fontSize: 13, color: 'var(--wd-mute)' }} className="serif italic">of {p.d.total} days · {p.d.used} used</div>
            <div className="bar-track" style={{ marginTop: 20 }}>
              <div className="bar-fill" style={{ width: `${(p.d.used / p.d.total) * 100}%`, background: p.color }}/>
            </div>
          </div>
        ))}
      </div>

      <SectionHead num="01" label="Your requests"/>
      {e.timeOffRequests.length === 0 ? (
        <div className="serif italic" style={{ color: 'var(--wd-mute)', fontSize: 18 }}>No active requests.</div>
      ) : (
        <table className="tbl">
          <thead><tr><th>Type</th><th>Dates</th><th>Days</th><th>Approver</th><th>Status</th></tr></thead>
          <tbody>
            {e.timeOffRequests.map(r => (
              <tr key={r.id}>
                <td>{r.type}</td>
                <td>{fmt.dateShort(r.from)} — {fmt.dateShort(r.to)}</td>
                <td>{r.days}</td>
                <td>{r.approver}</td>
                <td><span className={`status ${r.status === 'Approved' ? 'ok' : r.status === 'Pending' ? 'warn' : 'muted'}`}>· {r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <SectionHead num="02" label="Upcoming holidays"/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid var(--wd-line)' }}>
        {e.upcomingHolidays.map((h, i) => (
          <div key={i} className="lined-cell" style={{ borderRight: i < e.upcomingHolidays.length - 1 ? '1px solid var(--wd-line)' : 'none' }}>
            <div className="eb">{fmt.date(h.date).toUpperCase()}</div>
            <div className="serif" style={{ fontSize: 28, marginTop: 12, fontStyle: 'italic' }}>{h.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.WDModules = { home: Home, pay: Pay, timeoff: TimeOff };
window.WDPageHeader = PageHeader;
window.WDStatCells = StatCells;
window.WDSectionHead = SectionHead;
