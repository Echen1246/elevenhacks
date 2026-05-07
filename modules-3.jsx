/* === Modules 07-10: Team, Tasks, Learning, Documents === */

const fmt3 = window.WD.fmt;
const PH3 = window.WDPageHeader;
const SC3 = window.WDStatCells;
const SH3 = window.WDSectionHead;

// 07 TEAM
const Team = ({ employee }) => {
  const e = employee;
  const onLeave = e.team.filter(t => t.status === 'On leave').length;
  return (
    <div>
      <PH3 num="007" title={<>Your <em className="serif-it">team.</em></>}
        sub={`${e.team.length} people. ${onLeave} on leave today. Manager: ${e.manager}.`}/>

      <SC3 stats={[
        { label: 'Direct team', value: String(e.team.length).padStart(2, '0'), sub: 'incl. manager' },
        { label: 'On leave', value: String(onLeave).padStart(2, '0'), sub: 'today' },
        { label: 'Open roles', value: '02', sub: 'on team' },
        { label: 'Avg tenure', value: '3.2y', sub: 'team average' },
      ]}/>

      <SH3 num="01" label="People"/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--wd-line)' }}>
        {e.team.map((p, i) => (
          <div key={i} style={{ padding: 24, borderRight: (i % 3 !== 2) ? '1px solid var(--wd-line)' : 'none', borderBottom: '1px solid var(--wd-line-soft)' }}>
            <div className="row gap">
              <div className="avatar lg">{p.avatar}</div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 500 }}>{p.name}</div>
                <div className="serif italic" style={{ fontSize: 13, color: 'var(--wd-mute)' }}>{p.role}</div>
                {p.status && <div className="status warn" style={{ marginTop: 6 }}>· {p.status}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 08 TASKS
const Tasks = ({ employee }) => {
  const e = employee;
  const overdue = e.tasks.filter(t => t.priority === 'overdue').length;
  const high = e.tasks.filter(t => t.priority === 'high').length;
  return (
    <div>
      <PH3 num="008" title={<>Tasks & <em className="serif-it">approvals.</em></>}
        sub={overdue ? `${overdue} overdue. Handle these first.` : `${e.tasks.length} open items.`}/>

      <SC3 stats={[
        { label: 'Total open', value: String(e.tasks.length).padStart(2, '0'), sub: 'all priorities' },
        { label: 'Overdue', value: String(overdue).padStart(2, '0'), sub: overdue ? 'needs action' : 'all clear' },
        { label: 'High priority', value: String(high).padStart(2, '0'), sub: 'today/tomorrow' },
        { label: 'Completed', value: '14', sub: 'this week' },
      ]}/>

      <SH3 num="01" label="Open tasks"/>
      <div style={{ borderTop: '1px solid var(--wd-line)' }}>
        {e.tasks.map((t, i) => (
          <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 140px 100px', gap: 24, padding: '18px 0', borderBottom: '1px solid var(--wd-line-soft)', alignItems: 'center' }}>
            <div className="idx">{String(i + 1).padStart(2, '0')}</div>
            <div style={{ fontSize: 17 }}>{t.title}</div>
            <div className={`status ${t.priority === 'overdue' ? 'bad' : t.priority === 'high' ? 'warn' : 'muted'}`}>· {t.age}</div>
            <button className="btn sm" style={{ justifySelf: 'end' }}>Open →</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 09 LEARNING
const Learning = ({ employee }) => {
  const e = employee;
  const required = e.learning.filter(l => l.required);
  const complete = e.learning.filter(l => l.progress === 100).length;
  return (
    <div>
      <PH3 num="009" title={<>Learning & <em className="serif-it">development.</em></>}
        sub={`${required.length} required. ${complete} of ${e.learning.length} complete.`}/>

      <SC3 stats={[
        { label: 'Enrolled', value: String(e.learning.length).padStart(2, '0'), sub: 'courses' },
        { label: 'Required', value: String(required.length).padStart(2, '0'), sub: 'compliance' },
        { label: 'Complete', value: String(complete).padStart(2, '0'), sub: 'this year' },
        { label: 'Hours logged', value: '24h', sub: 'YTD' },
      ]}/>

      <SH3 num="01" label="Your learning"/>
      <div style={{ borderTop: '1px solid var(--wd-line)' }}>
        {e.learning.map((l, i) => (
          <div key={l.id} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 200px 80px 120px 120px', gap: 24, padding: '20px 0', borderBottom: '1px solid var(--wd-line-soft)', alignItems: 'center' }}>
            <div className="idx">{String(i + 1).padStart(2, '0')}</div>
            <div>
              <div style={{ fontSize: 17 }}>{l.title}</div>
              {l.required && <div className="status warn" style={{ marginTop: 4 }}>· required</div>}
            </div>
            <div className="bar-track"><div className="bar-fill" style={{ width: `${l.progress}%`, background: l.progress === 100 ? 'var(--wd-good)' : 'var(--wd-ink)' }}/></div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{l.progress}%</div>
            <div className="serif italic muted" style={{ fontSize: 13 }}>{l.due ? `due ${fmt3.dateShort(l.due)}` : 'self-paced'}</div>
            <button className="btn sm" style={{ justifySelf: 'end' }}>{l.progress === 100 ? 'Review' : 'Resume →'}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 10 DOCUMENTS
const Documents = ({ employee }) => {
  const e = employee;
  return (
    <div>
      <PH3 num="010" title={<>Your <em className="serif-it">documents.</em></>}
        sub="Tax forms, offer letters, policies — every piece of paper, searchable."
        action={<button className="btn sm">Upload</button>}/>

      <SC3 stats={[
        { label: 'Documents', value: String(e.documents.length).padStart(2, '0'), sub: 'on file' },
        { label: 'Tax forms', value: String(e.documents.filter(d => d.type === 'Tax').length).padStart(2, '0'), sub: '2025 + W-4' },
        { label: 'Policies', value: String(e.documents.filter(d => d.type === 'Policy').length).padStart(2, '0'), sub: 'acknowledged' },
        { label: 'Last updated', value: fmt3.dateShort(e.documents[0]?.date || '2026-01-01'), sub: e.documents[0]?.name.split(' ')[0] },
      ]}/>

      <SH3 num="01" label="All documents"/>
      <table className="tbl">
        <thead><tr><th>Document</th><th>Type</th><th>Date</th><th></th></tr></thead>
        <tbody>
          {e.documents.map((d, i) => (
            <tr key={i}>
              <td><strong>{d.name}</strong></td>
              <td className="muted">{d.type}</td>
              <td>{fmt3.date(d.date)}</td>
              <td style={{textAlign:'right'}}><a className="eb" href="#" style={{color:'var(--wd-ink)'}}>Download ↓</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Object.assign(window.WDModules, { team: Team, tasks: Tasks, learning: Learning, documents: Documents });
