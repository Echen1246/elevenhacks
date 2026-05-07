/* === Module 11: Messages === */

const fmt4 = window.WD.fmt;
const PH4 = window.WDPageHeader;

const Messages = ({ employee }) => {
  const e = employee;
  const messages = e.messages || [];
  const [selected, setSelected] = React.useState(messages[0]?.id || null);
  const sel = messages.find(m => m.id === selected) || messages[0];
  const unread = messages.filter(m => m.unread).length;

  return (
    <div>
      <PH4 num="11" eyebrow="Inbox" title={<>Messages,<br/><em>quietly.</em></>}
        sub={`${unread} unread · ${messages.length} total`}/>

      <div style={{
        display: 'grid', gridTemplateColumns: '380px 1fr',
        border: '1px solid var(--wd-line)', minHeight: 560, marginTop: 8,
      }}>
        {/* List */}
        <div style={{ borderRight: '1px solid var(--wd-line)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--wd-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="eb">All messages</div>
            <div className="eb" style={{ color: 'var(--wd-mute)' }}>↻</div>
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            {messages.map(m => (
              <div key={m.id} onClick={() => setSelected(m.id)}
                style={{
                  padding: '16px 18px',
                  borderBottom: '1px solid var(--wd-line-soft)',
                  cursor: 'pointer',
                  background: sel?.id === m.id ? 'var(--wd-bg)' : 'transparent',
                  borderLeft: sel?.id === m.id ? '2px solid var(--wd-ink)' : '2px solid transparent',
                  display: 'grid', gridTemplateColumns: '36px 1fr auto', gap: 14, alignItems: 'start',
                }}>
                <div className="avatar" style={{
                  width: 36, height: 36, fontSize: 11, flexShrink: 0,
                  background: m.system ? 'var(--wd-line)' : (sel?.id === m.id ? 'var(--wd-ink)' : 'var(--wd-paper)'),
                  color: m.system ? 'var(--wd-mute)' : (sel?.id === m.id ? 'var(--wd-paper)' : 'var(--wd-ink)'),
                  border: '1px solid var(--wd-line)',
                }}>{m.avatar}</div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {m.unread && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5722', flexShrink: 0 }}/>}
                    <span style={{ fontSize: 13, fontWeight: m.unread ? 600 : 400 }}>{m.from}</span>
                  </div>
                  <div className="eb" style={{ fontSize: 9, marginTop: 2 }}>{m.dept}</div>
                  <div style={{
                    fontSize: 13, color: 'var(--wd-ink-2)', marginTop: 6,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                    overflow: 'hidden', lineHeight: 1.4,
                  }}>{m.preview}</div>
                </div>
                <div className="eb" style={{ fontSize: 9, color: 'var(--wd-mute)' }}>{m.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Thread */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {sel ? (
            <>
              <div style={{ padding: '20px 32px', borderBottom: '1px solid var(--wd-line)' }}>
                <div className="eb">From</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 6 }}>
                  <div className="avatar" style={{
                    width: 44, height: 44, fontSize: 14,
                    background: sel.system ? 'var(--wd-line)' : 'var(--wd-ink)',
                    color: sel.system ? 'var(--wd-mute)' : 'var(--wd-paper)',
                  }}>{sel.avatar}</div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>{sel.from}</div>
                    <div className="eb" style={{ fontSize: 10 }}>{sel.dept} · {sel.time} ago</div>
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
                {(sel.thread || [{ from: sel.from, text: sel.preview, time: sel.time + ' ago' }]).map((t, i) => (
                  <div key={i} style={{ marginBottom: 24, maxWidth: '64ch' }}>
                    <div className="eb" style={{ fontSize: 9, marginBottom: 6 }}>{t.from} · {t.time}</div>
                    <div style={{
                      fontFamily: 'var(--font-serif)', fontSize: 19, lineHeight: 1.5,
                      color: 'var(--wd-ink)',
                    }}>{t.text}</div>
                  </div>
                ))}
              </div>

              <div style={{ padding: '20px 32px', borderTop: '1px solid var(--wd-line)' }}>
                <div className="eb" style={{ marginBottom: 10 }}>Reply</div>
                <div style={{
                  border: '1px solid var(--wd-line)', padding: '14px 16px',
                  background: 'var(--wd-paper)',
                  fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--wd-mute)',
                  fontStyle: 'italic',
                }}>
                  Type a reply, or hold the voice button below to dictate…
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
                  <button style={{
                    background: 'var(--wd-ink)', color: 'var(--wd-paper)',
                    border: 'none', padding: '10px 18px', fontSize: 13, fontWeight: 500,
                    cursor: 'pointer', fontFamily: 'var(--font-sans)',
                  }}>Send</button>
                  <button style={{
                    background: 'transparent', color: 'var(--wd-ink)',
                    border: '1px solid var(--wd-line)', padding: '10px 18px', fontSize: 13,
                    cursor: 'pointer', fontFamily: 'var(--font-sans)',
                  }}>Save draft</button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ padding: 48, color: 'var(--wd-mute)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18 }}>
              No messages.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

window.WDModules = window.WDModules || {};
window.WDModules.messages = Messages;
