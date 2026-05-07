/* === Modules 04-06: Benefits, Expenses, Career === */

const fmt2 = window.WD.fmt;
const PH2 = window.WDPageHeader;
const SC2 = window.WDStatCells;
const SH2 = window.WDSectionHead;

// =================================================================
// 04 BENEFITS
// =================================================================
const Benefits = ({ employee }) => {
  const e = employee;
  const b = e.benefits;
  return (
    <div>
      <PH2 num="004" title={<>Your <em className="serif-it">benefits.</em></>}
        sub="Health, dental, vision, retirement, HSA, life. Open enrollment November 1–15."/>

      <SC2 stats={[
        { label: 'Health plan', value: b.health.tier.split(' ')[0], sub: b.health.plan },
        { label: '401(k) balance', value: fmt2.moneyShort(b.retirement.balance), sub: `${b.retirement.contribution}% / ${b.retirement.match}% match` },
        { label: 'HSA balance', value: fmt2.moneyShort(b.hsa.balance), sub: `+${fmt2.moneyShort(b.hsa.employerContribution)}/yr employer` },
        { label: 'Total monthly', value: fmt2.moneyShort(b.health.monthly + b.dental.monthly + b.vision.monthly + (b.life.monthly || 0)), sub: 'pre-tax deduction' },
      ]}/>

      <SH2 num="01" label="Plans enrolled"/>
      <table className="tbl">
        <thead><tr><th>Plan</th><th>Coverage</th><th>Tier</th><th>Monthly</th><th></th></tr></thead>
        <tbody>
          <tr><td>Health</td><td>{b.health.plan}</td><td>{b.health.tier}</td><td>{fmt2.money(b.health.monthly)}</td><td style={{textAlign:'right'}}><a className="eb" href="#" style={{color:'var(--wd-ink)'}}>View ↗</a></td></tr>
          <tr><td>Dental</td><td>{b.dental.plan}</td><td>{b.dental.tier}</td><td>{fmt2.money(b.dental.monthly)}</td><td style={{textAlign:'right'}}><a className="eb" href="#" style={{color:'var(--wd-ink)'}}>View ↗</a></td></tr>
          <tr><td>Vision</td><td>{b.vision.plan}</td><td>{b.vision.tier}</td><td>{fmt2.money(b.vision.monthly)}</td><td style={{textAlign:'right'}}><a className="eb" href="#" style={{color:'var(--wd-ink)'}}>View ↗</a></td></tr>
          <tr><td>Life</td><td>{b.life.plan}</td><td>{fmt2.moneyShort(b.life.coverage)} cov.</td><td>{fmt2.money(b.life.monthly)}</td><td style={{textAlign:'right'}}><a className="eb" href="#" style={{color:'var(--wd-ink)'}}>View ↗</a></td></tr>
        </tbody>
      </table>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid var(--wd-line)', borderBottom: '1px solid var(--wd-line)', marginTop: 40 }}>
        <div className="lined-cell">
          <div className="eb">Retirement — 401(k)</div>
          <div className="bignum" style={{ fontSize: 64, marginTop: 16 }}>{fmt2.moneyShort(b.retirement.balance)}</div>
          <div style={{ fontSize: 14, color: 'var(--wd-mute)', marginTop: 8 }} className="serif italic">{b.retirement.plan}</div>
          <div style={{ marginTop: 24 }}>
            <div className="row between" style={{ marginBottom: 6 }}><span className="eb">Your contribution</span><strong>{b.retirement.contribution}%</strong></div>
            <div className="bar-track"><div className="bar-fill" style={{ width: `${(b.retirement.contribution/15)*100}%` }}/></div>
            <div className="row between" style={{ marginTop: 12, marginBottom: 6 }}><span className="eb">Employer match</span><strong>{b.retirement.match}%</strong></div>
            <div className="bar-track"><div className="bar-fill" style={{ width: `${(b.retirement.match/15)*100}%`, background: 'var(--wd-good)' }}/></div>
          </div>
          <button className="btn sm" style={{ marginTop: 20 }}>Adjust contribution</button>
        </div>
        <div className="lined-cell" style={{ borderRight: 'none' }}>
          <div className="eb">HSA — Health Savings</div>
          <div className="bignum" style={{ fontSize: 64, marginTop: 16 }}>{fmt2.moneyShort(b.hsa.balance)}</div>
          <div style={{ fontSize: 14, color: 'var(--wd-mute)', marginTop: 8 }} className="serif italic">YTD contribution: {fmt2.moneyShort(b.hsa.ytd)}</div>
          <div style={{ marginTop: 24, fontSize: 14, lineHeight: 1.8 }}>
            <div className="row between"><span>Employer contribution</span><strong>{fmt2.moneyShort(b.hsa.employerContribution)}/yr</strong></div>
            <div className="row between"><span>2026 limit</span><strong>$4,300</strong></div>
            <div className="row between"><span>Tax savings (est)</span><strong className="status ok">{fmt2.moneyShort(b.hsa.ytd * 0.3)}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// 05 EXPENSES
// =================================================================
const Expenses = ({ employee }) => {
  const e = employee;
  const total = e.expenses.reduce((s, x) => s + x.amount, 0);
  const pending = e.expenses.filter(x => x.status !== 'Submitted').reduce((s, x) => s + x.amount, 0);
  return (
    <div>
      <PH2 num="005" title={<>Expenses & <em className="serif-it">reimbursement.</em></>}
        sub={e.expenses.length === 0 ? 'Nothing pending. Quiet month.' : 'Capture, categorize, get reimbursed in 3 business days.'}
        action={<button className="btn primary sm">+ New expense</button>}/>

      <SC2 stats={[
        { label: 'Open total', value: fmt2.moneyShort(total), sub: `${e.expenses.length} items` },
        { label: 'Awaiting receipts', value: fmt2.moneyShort(pending), sub: 'reminder sent' },
        { label: 'Reimbursed YTD', value: fmt2.moneyShort(420), sub: '6 reports' },
        { label: 'Avg cycle', value: '2.3d', sub: 'submission to deposit' },
      ]}/>

      <SH2 num="01" label="Open expenses" right={<button className="btn sm">Submit report</button>}/>
      {e.expenses.length === 0 ? (
        <div className="serif italic" style={{ color: 'var(--wd-mute)', fontSize: 18 }}>No open expenses.</div>
      ) : (
        <table className="tbl">
          <thead><tr><th>Date</th><th>Vendor</th><th>Category</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {e.expenses.map(x => (
              <tr key={x.id}>
                <td>{fmt2.dateShort(x.date)}</td>
                <td>{x.vendor}</td>
                <td className="muted">{x.category}</td>
                <td><strong>{fmt2.money(x.amount)}</strong></td>
                <td><span className={`status ${x.status === 'Submitted' ? 'ok' : 'warn'}`}>· {x.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// =================================================================
// 06 CAREER
// =================================================================
const Career = ({ employee }) => {
  const e = employee;
  const goalsDone = e.goals.filter(g => g.status === 'Done').length;
  return (
    <div>
      <PH2 num="006" title={<>Career & <em className="serif-it">growth.</em></>}
        sub={`${e.review.period} review due ${fmt2.dateShort(e.review.dueDate)}. ${goalsDone} of ${e.goals.length} goals complete.`}/>

      <SC2 stats={[
        { label: 'Goals complete', value: `${goalsDone}/${e.goals.length}`, sub: e.review.period },
        { label: 'Self review', value: e.review.selfReview ? '✓' : '—', sub: e.review.selfReview ? 'submitted' : 'not started' },
        { label: 'Peer reviews', value: String(e.review.peerReviews).padStart(2, '0'), sub: 'received' },
        { label: 'Applications', value: String(e.jobs.applications.length).padStart(2, '0'), sub: `${e.jobs.viewed} jobs viewed` },
      ]}/>

      <SH2 num="01" label="Goals — current period"/>
      <div style={{ borderTop: '1px solid var(--wd-line)' }}>
        {e.goals.map((g, i) => (
          <div key={g.id} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 200px 80px 100px', gap: 24, padding: '20px 0', borderBottom: '1px solid var(--wd-line-soft)', alignItems: 'center' }}>
            <div className="idx">{String(i + 1).padStart(2, '0')}</div>
            <div style={{ fontSize: 17 }}>{g.title}</div>
            <div className="bar-track"><div className="bar-fill" style={{ width: `${g.progress}%`, background: g.status === 'Done' ? 'var(--wd-good)' : 'var(--wd-ink)' }}/></div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{g.progress}%</div>
            <div className={`status ${g.status === 'Done' ? 'ok' : 'muted'}`}>· {g.status}</div>
          </div>
        ))}
      </div>

      <SH2 num="02" label="Internal mobility — your applications" right={<button className="btn sm">Browse jobs →</button>}/>
      {e.jobs.applications.length === 0 ? (
        <div className="serif italic" style={{ color: 'var(--wd-mute)', fontSize: 18 }}>No active applications. {e.jobs.viewed} jobs viewed, {e.jobs.saved} saved.</div>
      ) : (
        <table className="tbl">
          <thead><tr><th>Role</th><th>Stage</th><th>Status</th></tr></thead>
          <tbody>
            {e.jobs.applications.map((j, i) => (
              <tr key={i}>
                <td><strong>{j.title}</strong></td>
                <td>{j.stage}</td>
                <td><span className={`status ${j.stage === 'Interview' ? 'ok' : 'muted'}`}>· {j.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

Object.assign(window.WDModules, { benefits: Benefits, expenses: Expenses, career: Career });
