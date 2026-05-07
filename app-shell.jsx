/* === App shell + module router === */

const NAV = [
  { id: 'home', label: 'Home', num: '01' },
  { id: 'pay', label: 'Pay', num: '02' },
  { id: 'timeoff', label: 'Time off', num: '03' },
  { id: 'benefits', label: 'Benefits', num: '04' },
  { id: 'expenses', label: 'Expenses', num: '05' },
  { id: 'career', label: 'Career', num: '06' },
  { id: 'team', label: 'Team', num: '07' },
  { id: 'tasks', label: 'Tasks', num: '08' },
  { id: 'learning', label: 'Learning', num: '09' },
  { id: 'documents', label: 'Documents', num: '10' },
  { id: 'messages', label: 'Messages', num: '11' },
];

const Sidebar = ({ current, onNav, employee, onSwitch, onTheme, theme }) => {
  const [showSwitch, setShowSwitch] = React.useState(false);
  return (
    <aside style={{
      width: 240, borderRight: '1px solid var(--wd-line)', padding: '24px 0',
      background: 'var(--wd-paper)', display: 'flex', flexDirection: 'column',
      position: 'sticky', top: 0, height: '100vh', flexShrink: 0,
    }}>
      <div style={{ padding: '0 24px 24px', borderBottom: '1px solid var(--wd-line)' }}>
        <a href="index.html" style={{ fontWeight: 600, fontSize: 22, letterSpacing: '-0.04em' }}>
          Workday<span style={{ color: 'var(--wd-accent)' }}>.</span>
        </a>
        <div className="eb" style={{ marginTop: 6, fontSize: 10 }}>Acme Corp · v0.1</div>
      </div>

      <nav style={{ flex: 1, padding: '16px 0', overflow: 'auto' }}>
        {NAV.map(n => (
          <a key={n.id} onClick={() => onNav(n.id)}
            style={{
              display: 'grid', gridTemplateColumns: '32px 1fr', alignItems: 'center',
              padding: '10px 24px', cursor: 'pointer',
              background: current === n.id ? 'var(--wd-bg)' : 'transparent',
              borderLeft: current === n.id ? '2px solid var(--wd-ink)' : '2px solid transparent',
              transition: 'all 0.1s',
            }}>
            <span className="idx">{n.num}</span>
            <span style={{ fontSize: 15, fontWeight: current === n.id ? 500 : 400 }}>{n.label}</span>
          </a>
        ))}
      </nav>

      <div style={{ padding: 16, borderTop: '1px solid var(--wd-line)', position: 'relative' }}>
        {showSwitch && (
          <div style={{
            position: 'absolute', bottom: 'calc(100% + 4px)', left: 16, right: 16,
            background: 'var(--wd-paper)', border: '1px solid var(--wd-line)',
            boxShadow: '4px 4px 0 var(--wd-ink)',
          }}>
            {Object.values(window.WD_EMPLOYEES).map(e => (
              <div key={e.id} onClick={() => { onSwitch(e.id); setShowSwitch(false); }}
                style={{ padding: '12px 14px', cursor: 'pointer', borderBottom: '1px solid var(--wd-line-soft)',
                  background: e.id === employee.id ? 'var(--wd-bg)' : 'transparent' }}>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{e.firstName} {e.lastName}</div>
                <div className="eb" style={{ fontSize: 9 }}>{e.dept}</div>
              </div>
            ))}
            <div onClick={() => onTheme()} style={{ padding: '12px 14px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--wd-mute)' }}>
              Toggle {theme === 'dark' ? 'light' : 'dark'} mode
            </div>
          </div>
        )}
        <div onClick={() => setShowSwitch(s => !s)}
          style={{ display: 'grid', gridTemplateColumns: '36px 1fr 16px', gap: 12, alignItems: 'center', cursor: 'pointer' }}>
          <div className="avatar" style={{ background: employee.color }}>{employee.avatar}</div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{employee.firstName} {employee.lastName}</div>
            <div className="eb" style={{ fontSize: 9 }}>{employee.dept}</div>
          </div>
          <span style={{ color: 'var(--wd-mute)', fontFamily: 'var(--font-mono)' }}>{showSwitch ? '▾' : '▴'}</span>
        </div>
      </div>
    </aside>
  );
};

const Topbar = ({ section, employee }) => {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  return (
    <div style={{
      padding: '20px 48px', borderBottom: '1px solid var(--wd-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      position: 'sticky', top: 0, background: 'var(--wd-bg)', zIndex: 10,
    }}>
      <div className="eb">Workday ——— {employee.firstName} {employee.lastName} / {employee.title}</div>
      <div className="row gap-lg">
        <div className="eb">{dateStr.toUpperCase()} · {timeStr}</div>
        <div className="eb">⌘K  Search</div>
      </div>
    </div>
  );
};

const App = () => {
  const [section, setSection] = React.useState(() => {
    const hash = (location.hash || '#home').slice(1);
    return NAV.find(n => n.id === hash) ? hash : 'home';
  });
  const [employeeId, setEmployeeId] = React.useState(() => localStorage.getItem('wd_employee') || 'sarah');
  const [theme, setTheme] = React.useState(() => localStorage.getItem('wd_theme') || 'light');
  const employee = window.WD_EMPLOYEES[employeeId];

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('wd_theme', theme);
  }, [theme]);

  React.useEffect(() => {
    location.hash = section;
  }, [section]);

  const onSwitch = (id) => {
    window.WD.set(id);
    setEmployeeId(id);
    if (window.WDVoice) setTimeout(() => window.WDVoice.mount(), 50);
  };

  const Module = window.WDModules[section] || window.WDModules.home;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar current={section} onNav={setSection} employee={employee}
        onSwitch={onSwitch}
        onTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        theme={theme}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Topbar section={section} employee={employee}/>
        <main key={section + employeeId} className="scroll-fade" style={{ padding: '40px 48px 140px', maxWidth: 1440, margin: '0 auto' }}>
          <Module employee={employee} go={setSection}/>
        </main>
      </div>
    </div>
  );
};

window.WDApp = App;
