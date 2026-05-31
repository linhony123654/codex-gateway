import { useState, useEffect } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const API = '/api'

const fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Source+Code+Pro:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap'
fontLink.rel = 'stylesheet'
document.head.appendChild(fontLink)

const v = {
  bg: '#faf8f4', bgCard: '#ffffff',
  text: '#2d2a26', textLight: '#7a756d', textMuted: '#a9a39a',
  accent: '#b8860b', accentHover: '#9a7209',
  border: '#e8e3da', borderLight: '#f0ece4',
  danger: '#9b2c2c',
  serif: '"Playfair Display", "Noto Serif SC", Georgia, serif',
  body: '"Cormorant Garamond", "Noto Serif SC", Georgia, serif',
  mono: '"Source Code Pro", "Consolas", monospace',
}

// ── Login Page ──
function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setTimeout(() => setMounted(true), 100) }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem('token', data.token)
        onLogin(data.token)
      } else {
        setError('密码错误')
        setPassword('')
      }
    } catch {
      setError('连接失败')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: v.bg, display: 'flex', flexDirection: 'column' }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${v.accent}; color: #fff; }
        input:focus { outline: none; border-color: ${v.accent} !important; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{
          width: '100%', maxWidth: 400,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Logo area */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 6, color: v.textMuted, marginBottom: 16, textTransform: 'uppercase', fontFamily: v.mono }}>
              Configuration Suite
            </div>
            <h1 style={{ fontFamily: v.serif, fontSize: 40, fontWeight: 400, color: v.text, letterSpacing: 1 }}>
              API <em style={{ fontStyle: 'italic', color: v.accent }}>Gateway</em>
            </h1>
            <div style={{ width: 48, height: 1, background: v.accent, margin: '20px auto' }} />
          </div>

          {/* Login form */}
          <div style={{ background: v.bgCard, border: `1px solid ${v.border}`, padding: '36px 32px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, left: -1, width: 18, height: 18, borderTop: `2px solid ${v.accent}`, borderLeft: `2px solid ${v.accent}` }} />
            <div style={{ position: 'absolute', bottom: -1, right: -1, width: 18, height: 18, borderBottom: `2px solid ${v.accent}`, borderRight: `2px solid ${v.accent}` }} />

            <h2 style={{ fontFamily: v.serif, fontSize: 22, fontWeight: 400, textAlign: 'center', marginBottom: 8 }}>
              身份验证
            </h2>
            <p style={{ fontSize: 14, color: v.textMuted, textAlign: 'center', marginBottom: 28, fontStyle: 'italic' }}>
              请输入密码以访问管理界面
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: v.textMuted, marginBottom: 8, fontFamily: v.mono, fontWeight: 500 }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="输入密码"
                  autoFocus
                  style={{
                    width: '100%', padding: '12px 16px', border: `1px solid ${error ? v.danger : v.border}`,
                    fontSize: 16, fontFamily: v.body, color: v.text, background: v.bg,
                    outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box',
                  }}
                />
                {error && (
                  <div style={{ fontSize: 12, color: v.danger, marginTop: 8, fontStyle: 'italic' }}>
                    {error}
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading || !password} style={{
                width: '100%', padding: '13px 0', background: loading || !password ? v.textMuted : v.text,
                color: '#fff', border: 'none', cursor: loading ? 'wait' : 'pointer',
                fontSize: 12, fontFamily: v.mono, letterSpacing: 3, textTransform: 'uppercase',
                transition: 'background 0.3s',
              }}>
                {loading ? '验证中...' : '进入'}
              </button>
            </form>
          </div>

          <p style={{ fontSize: 12, color: v.textMuted, textAlign: 'center', marginTop: 20, fontStyle: 'italic' }}>
            API Gateway &middot; Codex CLI &amp; Claude Code
          </p>
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '24px', fontSize: 11, color: v.textMuted, letterSpacing: 3, textTransform: 'uppercase', fontFamily: v.mono }}>
        2026
      </footer>
    </div>
  )
}

// ── Main App ──
function Dashboard({ token, onLogout }) {
  const [config, setConfig] = useState({ activeProvider: null, providers: {} })
  const [editing, setEditing] = useState(null)
  const [tab, setTab] = useState('codex')
  const [page, setPage] = useState('manage') // manage | stats
  const [form, setForm] = useState({ id: '', name: '', baseUrl: '', apiKey: '', models: '', anthropicUrl: '', claudeModel: '' })
  const [status, setStatus] = useState(null)
  const [usage, setUsage] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [pwForm, setPwForm] = useState({ old: '', new: '', confirm: '' })
  const [pwError, setPwError] = useState('')

  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }

  useEffect(() => {
    loadConfig(); loadStatus(); loadUsage()
    setTimeout(() => setMounted(true), 100)
  }, [])

  async function loadConfig() {
    const res = await fetch(`${API}/providers`, { headers })
    if (res.status === 401) { onLogout(); return }
    setConfig(await res.json())
  }

  async function loadStatus() {
    const res = await fetch(`${API}/status`)
    setStatus(await res.json())
  }

  async function loadUsage() {
    const res = await fetch(`${API}/usage`, { headers })
    if (res.ok) setUsage(await res.json())
  }

  async function resetUsage() {
    if (!confirm('确定清除所有统计数据？')) return
    await fetch(`${API}/usage`, { method: 'DELETE', headers })
    loadUsage()
  }

  async function handleActivate(id, type) {
    await fetch(`${API}/providers/${id}/activate`, {
      method: 'POST', headers,
      body: JSON.stringify({ type })
    })
    loadConfig(); loadStatus()
  }

  async function handleDelete(id, type) {
    const p = config.providers[id]
    const hasBoth = p.baseUrl && p.anthropicUrl
    const msg = hasBoth ? `从 ${type === 'codex' ? 'Codex CLI' : 'Claude Code'} 中删除 ${p.name}？` : `删除 ${p.name}？`
    if (!confirm(msg)) return
    await fetch(`${API}/providers/${id}?type=${type}`, { method: 'DELETE', headers })
    loadConfig(); loadStatus()
  }

  function handleEdit(id) {
    const p = config.providers[id]
    setEditing(id)
    setForm({ id, name: p.name, baseUrl: p.baseUrl || '', apiKey: p.apiKey || '', models: (p.models || []).join(', '), anthropicUrl: p.anthropicUrl || '', claudeModel: p.claudeModel || '' })
  }

  function handleNew() {
    setEditing('new')
    setForm({ id: '', name: '', baseUrl: '', apiKey: '', models: '', anthropicUrl: '', claudeModel: '' })
  }

  async function handleSave() {
    const data = {
      id: form.id || form.name.toLowerCase().replace(/\s+/g, '-'),
      name: form.name, baseUrl: form.baseUrl.replace(/\/+$/, ''), apiKey: form.apiKey,
      models: form.models.split(',').map(m => m.trim()).filter(Boolean),
      anthropicUrl: form.anthropicUrl.replace(/\/+$/, '') || undefined,
      claudeModel: form.claudeModel || undefined,
    }
    if (editing === 'new') {
      await fetch(`${API}/providers`, { method: 'POST', headers, body: JSON.stringify(data) })
    } else {
      await fetch(`${API}/providers/${editing}`, { method: 'PUT', headers, body: JSON.stringify(data) })
    }
    setEditing(null); loadConfig(); loadStatus()
  }

  async function handleChangePassword(e) {
    e.preventDefault()
    setPwError('')
    if (pwForm.new !== pwForm.confirm) { setPwError('两次密码不一致'); return }
    if (pwForm.new.length < 4) { setPwError('密码至少4位'); return }
    const res = await fetch(`${API}/password`, {
      method: 'POST', headers,
      body: JSON.stringify({ oldPassword: pwForm.old, newPassword: pwForm.new }),
    })
    const data = await res.json()
    if (data.success) {
      setShowPassword(false)
      setPwForm({ old: '', new: '', confirm: '' })
      alert('密码已修改')
    } else {
      setPwError(data.error || '修改失败')
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    onLogout()
  }

  const isCodex = tab === 'codex'
  const providers = Object.entries(config.providers).filter(([, p]) => isCodex ? p.baseUrl : p.anthropicUrl)

  return (
    <div style={{ minHeight: '100vh', background: v.bg, color: v.text, fontFamily: v.body }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${v.accent}; color: #fff; }
        input:focus { outline: none; border-color: ${v.accent} !important; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr !important; }
          .meta-grid { grid-template-columns: 1fr !important; }
          .card-actions { flex-wrap: wrap; }
          .masthead-title { font-size: 36px !important; }
          .chart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Masthead ── */}
      <header style={{ padding: '40px 24px 28px', textAlign: 'center', borderBottom: `1px solid ${v.border}` }}>
        <div style={{
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: v.textMuted, marginBottom: 12, textTransform: 'uppercase', fontFamily: v.mono }}>
            Configuration Suite &middot; 2026
          </div>
          <h1 className="masthead-title" style={{ fontFamily: v.serif, fontSize: 44, fontWeight: 400, color: v.text, letterSpacing: 1, lineHeight: 1.2 }}>
            API <em style={{ fontStyle: 'italic', color: v.accent }}>Gateway</em>
          </h1>
          <div style={{ width: 48, height: 1, background: v.accent, margin: '16px auto' }} />
        </div>
      </header>

      {/* ── Status + Logout ── */}
      <div style={{ background: '#f0ece4', borderBottom: `1px solid ${v.border}`, padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'inline-flex', gap: 16, fontSize: 12, color: v.textLight, fontFamily: v.mono, letterSpacing: 1, textTransform: 'uppercase', flexWrap: 'wrap' }}>
          <span>
            <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: status?.activeProvider ? '#5a8a5a' : '#a85454', marginRight: 6, verticalAlign: 'middle' }} />
            {status?.activeProvider ? status.activeConfig?.name : 'No Provider'}
          </span>
          <span style={{ color: v.border }}>·</span>
          <span>Port {status?.proxyPort || 11434}</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', fontSize: 11, color: v.textMuted, cursor: 'pointer', fontFamily: v.mono, letterSpacing: 1, textTransform: 'uppercase' }}>
            修改密码
          </button>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', fontSize: 11, color: v.danger, cursor: 'pointer', fontFamily: v.mono, letterSpacing: 1, textTransform: 'uppercase' }}>
            退出
          </button>
        </div>
      </div>

      {/* ── Change Password ── */}
      {showPassword && (
        <div style={{ maxWidth: 400, margin: '20px auto 0', padding: '0 24px', animation: 'slideDown 0.3s ease' }}>
          <form onSubmit={handleChangePassword} style={{ background: v.bgCard, border: `1px solid ${v.border}`, padding: 24 }}>
            <h4 style={{ fontFamily: v.serif, fontSize: 18, marginBottom: 16 }}>修改密码</h4>
            <div style={{ marginBottom: 12 }}>
              <label style={lbl}>当前密码</label>
              <input type="password" value={pwForm.old} onChange={e => setPwForm({ ...pwForm, old: e.target.value })} style={inp} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={lbl}>新密码</label>
              <input type="password" value={pwForm.new} onChange={e => setPwForm({ ...pwForm, new: e.target.value })} style={inp} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>确认密码</label>
              <input type="password" value={pwForm.confirm} onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })} style={inp} />
            </div>
            {pwError && <div style={{ fontSize: 12, color: v.danger, marginBottom: 12, fontStyle: 'italic' }}>{pwError}</div>}
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" style={btnPrimary}>保存</button>
              <button type="button" onClick={() => { setShowPassword(false); setPwError('') }} style={btnGhost}>取消</button>
            </div>
          </form>
        </div>
      )}

      {/* ── Navigation ── */}
      <div style={{ borderBottom: `1px solid ${v.border}`, background: v.bg }}>
        <nav style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => setPage('manage')} style={{
            padding: '14px 32px', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase',
            cursor: 'pointer', background: 'none', border: 'none', fontFamily: v.mono, fontWeight: 500,
            color: page === 'manage' ? v.text : v.textMuted,
            borderBottom: page === 'manage' ? `2px solid ${v.accent}` : '2px solid transparent',
            transition: 'all 0.3s',
          }}>管理</button>
          <button onClick={() => setPage('stats')} style={{
            padding: '14px 32px', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase',
            cursor: 'pointer', background: 'none', border: 'none', fontFamily: v.mono, fontWeight: 500,
            color: page === 'stats' ? v.text : v.textMuted,
            borderBottom: page === 'stats' ? `2px solid ${v.accent}` : '2px solid transparent',
            transition: 'all 0.3s',
          }}>统计</button>
        </nav>
        {page === 'manage' && (
          <nav style={{ display: 'flex', justifyContent: 'center', borderTop: `1px solid ${v.borderLight}` }}>
            {['codex', 'claude'].map(t => (
              <button key={t} onClick={() => { setTab(t); setEditing(null) }} style={{
                padding: '10px 28px', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
                cursor: 'pointer', background: 'none', border: 'none', fontFamily: v.mono,
                color: tab === t ? v.accent : v.textMuted,
                borderBottom: tab === t ? `2px solid ${v.accent}` : '2px solid transparent',
                transition: 'all 0.3s',
              }}>
                {t === 'codex' ? 'Codex CLI' : 'Claude Code'}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* ── Main ── */}
      <main style={{
        maxWidth: 820, margin: '0 auto', padding: '36px 24px 80px',
        opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
      }}>

      {page === 'stats' ? (
        /* ── Statistics Page ── */
        <StatsPage usage={usage} config={config} resetUsage={resetUsage} />
      ) : (
        /* ── Manage Page ── */
        <>
        <div style={{ textAlign: 'right', marginBottom: 32 }}>
          <button onClick={handleNew} style={btnPrimary}
            onMouseEnter={e => e.target.style.background = v.accent}
            onMouseLeave={e => e.target.style.background = v.text}
          >+ 添加提供商</button>
        </div>

        {editing && (
          <div style={{ background: v.bgCard, border: `1px solid ${v.border}`, padding: '28px 24px', marginBottom: 36, position: 'relative', animation: 'slideDown 0.35s ease' }}>
            <div style={{ position: 'absolute', top: -1, left: -1, width: 16, height: 16, borderTop: `2px solid ${v.accent}`, borderLeft: `2px solid ${v.accent}` }} />
            <div style={{ position: 'absolute', bottom: -1, right: -1, width: 16, height: 16, borderBottom: `2px solid ${v.accent}`, borderRight: `2px solid ${v.accent}` }} />
            <h3 style={{ fontFamily: v.serif, fontSize: 20, fontWeight: 400, marginBottom: 24, paddingBottom: 14, borderBottom: `1px solid ${v.borderLight}` }}>
              {editing === 'new' ? '添加提供商' : '编辑提供商'}
            </h3>
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div><label style={lbl}>ID</label><input value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} placeholder="xiaomi" disabled={editing !== 'new'} style={inp} /></div>
                <div><label style={lbl}>名称</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="小米 MiMo" style={inp} /></div>
              </div>
              {isCodex ? (
                <>
                  <div><label style={lbl}>OpenAI Base URL</label><input value={form.baseUrl} onChange={e => setForm({ ...form, baseUrl: e.target.value })} placeholder="https://api.example.com/v1" style={inp} /></div>
                  <div><label style={lbl}>API Key</label><input value={form.apiKey} onChange={e => setForm({ ...form, apiKey: e.target.value })} placeholder="sk-..." type="password" style={inp} /></div>
                  <div><label style={lbl}>模型（逗号分隔）</label><input value={form.models} onChange={e => setForm({ ...form, models: e.target.value })} placeholder="model-a, model-b" style={inp} /></div>
                </>
              ) : (
                <>
                  <div><label style={lbl}>Anthropic Base URL</label><input value={form.anthropicUrl} onChange={e => setForm({ ...form, anthropicUrl: e.target.value })} placeholder="https://api.example.com/anthropic" style={inp} /></div>
                  <div><label style={lbl}>API Key</label><input value={form.apiKey} onChange={e => setForm({ ...form, apiKey: e.target.value })} placeholder="sk-..." type="password" style={inp} /></div>
                  <div><label style={lbl}>Claude Model</label><input value={form.claudeModel} onChange={e => setForm({ ...form, claudeModel: e.target.value })} placeholder="model-name[1m]" style={inp} /></div>
                </>
              )}
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button onClick={handleSave} style={btnPrimary}>保存</button>
                <button onClick={() => setEditing(null)} style={btnGhost}>取消</button>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: v.textMuted, fontFamily: v.mono, whiteSpace: 'nowrap' }}>{isCodex ? 'Codex CLI' : 'Claude Code'}</span>
          <div style={{ flex: 1, height: 1, background: v.border }} />
          <span style={{ fontSize: 11, color: v.textMuted, fontFamily: v.mono }}>{providers.length}</span>
        </div>

        {/* Active provider first, then expand button, then others */}
        {(() => {
          const activeId = isCodex
            ? (status?.activeCodex || config.activeProvider)
            : (status?.activeClaude || config.activeProvider)
          const activeEntry = providers.find(([id]) => id === activeId)
          const otherEntries = providers.filter(([id]) => id !== activeId)

          return (
            <div style={{ display: 'grid', gap: 18 }}>
              {/* Active provider */}
              {activeEntry && <ProviderCard id={activeEntry[0]} p={activeEntry[1]} active={true} isCodex={isCodex} onActivate={handleActivate} onEdit={handleEdit} onDelete={handleDelete} />}

              {/* Expand button */}
              {otherEntries.length > 0 && (
                <button onClick={() => setExpanded(!expanded)} style={{
                  background: 'none', border: `1px dashed ${v.border}`, padding: '14px',
                  cursor: 'pointer', fontSize: 12, color: v.textMuted, fontFamily: v.mono,
                  letterSpacing: 2, textTransform: 'uppercase', transition: 'all 0.3s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = v.accent; e.currentTarget.style.color = v.accent }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = v.border; e.currentTarget.style.color = v.textMuted }}
                >
                  {expanded ? '收起' : `展开其他 (${otherEntries.length})`}
                  <span style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', display: 'inline-block' }}>▼</span>
                </button>
              )}

              {/* Other providers */}
              {expanded && otherEntries.map(([id, p], i) => (
                <ProviderCard key={id} id={id} p={p} active={false} isCodex={isCodex} onActivate={handleActivate} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )
        })()}

        {providers.length === 0 && <div style={{ textAlign: 'center', padding: '50px 0', color: v.textMuted, fontStyle: 'italic' }}>暂无配置</div>}

        <div style={{ marginTop: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: v.textMuted, fontFamily: v.mono }}>Quick Start</span>
            <div style={{ flex: 1, height: 1, background: v.border }} />
          </div>
          <div style={{ background: '#f5f2ec', border: `1px solid ${v.border}`, padding: 24, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, left: -1, width: 12, height: 12, borderTop: `2px solid ${v.accent}`, borderLeft: `2px solid ${v.accent}` }} />
            <div style={{ position: 'absolute', bottom: -1, right: -1, width: 12, height: 12, borderBottom: `2px solid ${v.accent}`, borderRight: `2px solid ${v.accent}` }} />
            <pre style={{ fontFamily: v.mono, fontSize: 13, lineHeight: 2, color: v.textLight, margin: 0, overflow: 'auto', whiteSpace: 'pre-wrap' }}>
{isCodex
? `$ source ~/.bashrc\n$ codex-xiaomi exec "your prompt"\n$ codex-deepseek exec "your prompt"\n$ codexgo exec "your prompt"`
: `$ source ~/.bashrc\n$ claude-xiaomi\n$ claude-deepseek\n$ claudego`}
            </pre>
          </div>
          <p style={{ fontSize: 13, color: v.textMuted, fontStyle: 'italic', marginTop: 10, textAlign: 'center' }}>
            添加提供商后运行 <code style={{ fontFamily: v.mono, fontSize: 11, background: '#f0ece4', padding: '2px 8px' }}>source ~/.bashrc</code> 加载命令
          </p>
        </div>
        </>
      )}
      </main>

      <footer style={{ textAlign: 'center', padding: '28px 24px', fontSize: 11, color: v.textMuted, letterSpacing: 3, textTransform: 'uppercase', fontFamily: v.mono, borderTop: `1px solid ${v.border}` }}>
        API Gateway &middot; 2026
      </footer>
    </div>
  )
}

// ── Provider Card ──
function ProviderCard({ id, p, active, isCodex, onActivate, onEdit, onDelete }) {
  return (
    <div style={{ background: v.bgCard, border: `1px solid ${active ? v.accent : v.border}`, position: 'relative', animation: 'fadeUp 0.4s ease', transition: 'border-color 0.3s' }}>
      {active && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${v.accent}, ${v.accent}88)` }} />}
      <div style={{ padding: '22px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 10, flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontFamily: v.serif, fontSize: 22, fontWeight: 400, marginBottom: 2 }}>{p.name}</h3>
            {active && <span style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: v.accent, fontFamily: v.mono }}>● Active</span>}
          </div>
          <div className="card-actions" style={{ display: 'flex', gap: 6 }}>
            {!active && <button onClick={() => onActivate(id, isCodex ? 'codex' : 'claude')} style={btnAccent}>激活</button>}
            <button onClick={() => onEdit(id)} style={btnGhost}>编辑</button>
            <button onClick={() => onDelete(id, isCodex ? 'codex' : 'claude')} style={btnDanger}>删除</button>
          </div>
        </div>
        <div style={{ height: 1, background: v.borderLight, marginBottom: 16 }} />
        <div className="meta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: 14 }}>
          <Meta label="Endpoint" value={isCodex ? p.baseUrl : p.anthropicUrl} />
          <Meta label="API Key" value={`${p.apiKey.slice(0, 10)}${'·'.repeat(6)}${p.apiKey.slice(-4)}`} />
          <div style={{ gridColumn: '1 / -1' }}>
            <span style={metaLbl}>{isCodex ? 'Models' : 'Model'}</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
              {isCodex ? (
                (p.models || []).map(m => <span key={m} style={{ background: v.bg, border: `1px solid ${v.border}`, padding: '4px 12px', fontSize: 12, fontFamily: v.mono, color: v.textLight }}>{m}</span>)
              ) : (
                <span style={{ background: v.bg, border: `1px solid ${v.border}`, padding: '4px 12px', fontSize: 12, fontFamily: v.mono, color: v.textLight }}>{p.claudeModel}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Stats Page ──
const COLORS = ['#b8860b', '#6b8e23', '#4682b4', '#9370db', '#cd853f', '#20b2aa']

function StatsPage({ usage, config, resetUsage }) {
  const [range, setRange] = useState(7)

  if (!usage) return null

  const daily = (usage.daily || []).slice(-range)
  const chartData = daily.map(d => ({
    date: d.date.slice(5),
    Prompt: d.promptTokens,
    Completion: d.completionTokens,
    Total: d.totalTokens,
  }))

  const providerPie = Object.entries(usage.providers).map(([id, prov]) => ({
    name: config.providers[id]?.name || id,
    value: prov.total.totalTokens,
  })).filter(p => p.value > 0)

  return (
    <div>
      <style>{`
        .recharts-text { font-family: "Source Code Pro", monospace !important; font-size: 11px !important; fill: #a9a39a !important; }
        .recharts-tooltip-wrapper { outline: none !important; }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: v.textMuted, fontFamily: v.mono }}>Token 用量统计</span>
        <div style={{ flex: 1, height: 1, background: v.border }} />
        <div style={{ display: 'flex', gap: 4 }}>
          {[7, 14, 30].map(d => (
            <button key={d} onClick={() => setRange(d)} style={{
              padding: '5px 12px', fontSize: 11, cursor: 'pointer', border: 'none',
              background: range === d ? v.text : '#f0ece4',
              color: range === d ? '#fff' : v.textMuted,
              fontFamily: v.mono, letterSpacing: 1,
            }}>{d}天</button>
          ))}
        </div>
        <button onClick={resetUsage} style={{ ...btnDanger, fontSize: 10, padding: '5px 12px' }}>清除</button>
      </div>

      {/* Overview cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 28 }}>
        <StatCard label="总请求数" value={usage.total.requests} />
        <StatCard label="Prompt Tokens" value={usage.total.promptTokens} />
        <StatCard label="Completion Tokens" value={usage.total.completionTokens} />
        <StatCard label="Total Tokens" value={usage.total.totalTokens} />
      </div>

      {/* Daily trend chart */}
      {chartData.length > 0 && (
        <div style={{ background: v.bgCard, border: `1px solid ${v.border}`, padding: 24, marginBottom: 20 }}>
          <h4 style={{ fontFamily: v.serif, fontSize: 16, fontWeight: 400, marginBottom: 20 }}>每日用量趋势</h4>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrompt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b8860b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#b8860b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4682b4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4682b4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece4" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{
                background: '#fff', border: '1px solid #e8e3da', borderRadius: 0,
                fontFamily: '"Source Code Pro", monospace', fontSize: 12,
              }} />
              <Area type="monotone" dataKey="Prompt" stroke="#b8860b" fillOpacity={1} fill="url(#colorPrompt)" strokeWidth={2} />
              <Area type="monotone" dataKey="Completion" stroke="#4682b4" fillOpacity={1} fill="url(#colorCompletion)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 12 }}>
            <span style={{ fontSize: 11, color: v.textMuted, fontFamily: v.mono }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, background: '#b8860b', marginRight: 6, verticalAlign: 'middle' }} />
              Prompt
            </span>
            <span style={{ fontSize: 11, color: v.textMuted, fontFamily: v.mono }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, background: '#4682b4', marginRight: 6, verticalAlign: 'middle' }} />
              Completion
            </span>
          </div>
        </div>
      )}

      {/* Provider pie + bar chart */}
      {providerPie.length > 0 && (
        <div className="chart-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div style={{ background: v.bgCard, border: `1px solid ${v.border}`, padding: 24 }}>
            <h4 style={{ fontFamily: v.serif, fontSize: 16, fontWeight: 400, marginBottom: 16 }}>提供商分布</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={providerPie} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                  {providerPie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{
                  background: '#fff', border: '1px solid #e8e3da', borderRadius: 0,
                  fontFamily: '"Source Code Pro", monospace', fontSize: 12,
                }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 8 }}>
              {providerPie.map((p, i) => (
                <span key={i} style={{ fontSize: 11, color: v.textMuted, fontFamily: v.mono }}>
                  <span style={{ display: 'inline-block', width: 8, height: 8, background: COLORS[i % COLORS.length], marginRight: 4, verticalAlign: 'middle' }} />
                  {p.name}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: v.bgCard, border: `1px solid ${v.border}`, padding: 24 }}>
            <h4 style={{ fontFamily: v.serif, fontSize: 16, fontWeight: 400, marginBottom: 16 }}>每日请求量</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ece4" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{
                  background: '#fff', border: '1px solid #e8e3da', borderRadius: 0,
                  fontFamily: '"Source Code Pro", monospace', fontSize: 12,
                }} />
                <Bar dataKey="Total" fill="#b8860b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Per provider details */}
      {Object.entries(usage.providers).map(([id, prov]) => {
        const p = config.providers[id]
        return (
          <div key={id} style={{ background: v.bgCard, border: `1px solid ${v.border}`, padding: 24, marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h4 style={{ fontFamily: v.serif, fontSize: 17, fontWeight: 400 }}>{p?.name || id}</h4>
              <span style={{ fontSize: 11, color: v.textMuted, fontFamily: v.mono }}>{prov.total.requests} requests</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 10 }}>
              <StatCard label="Prompt" value={prov.total.promptTokens} small />
              <StatCard label="Completion" value={prov.total.completionTokens} small />
              <StatCard label="Total" value={prov.total.totalTokens} small />
            </div>
            {Object.entries(prov.models).length > 1 && (
              <div style={{ borderTop: `1px solid ${v.borderLight}`, paddingTop: 10, marginTop: 12 }}>
                {Object.entries(prov.models).map(([model, m]) => (
                  <div key={model} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12 }}>
                    <span style={{ fontFamily: v.mono, color: v.textLight }}>{model}</span>
                    <span style={{ fontFamily: v.mono, color: v.textMuted }}>{m.totalTokens.toLocaleString()} tokens</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {Object.keys(usage.providers).length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: v.textMuted, fontStyle: 'italic' }}>
          暂无使用记录
        </div>
      )}
    </div>
  )
}

// ── Root ──
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  if (!token) return <LoginPage onLogin={setToken} />
  return <Dashboard token={token} onLogout={() => setToken(null)} />
}

function Meta({ label, value }) {
  return (
    <div>
      <span style={metaLbl}>{label}</span>
      <div style={{ fontFamily: '"Source Code Pro", monospace', fontSize: 13, color: '#7a756d', marginTop: 2, wordBreak: 'break-all' }}>{value}</div>
    </div>
  )
}

function StatCard({ label, value, small }) {
  return (
    <div style={{ background: '#faf8f4', border: '1px solid #f0ece4', padding: small ? '12px 14px' : '16px 18px' }}>
      <div style={{ fontSize: small ? 10 : 11, letterSpacing: 2, textTransform: 'uppercase', color: '#a9a39a', fontFamily: '"Source Code Pro", monospace', marginBottom: small ? 4 : 6 }}>
        {label}
      </div>
      <div style={{ fontFamily: '"Playfair Display", serif', fontSize: small ? 20 : 28, color: '#2d2a26', fontWeight: 400 }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </div>
  )
}

const lbl = { display: 'block', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#a9a39a', marginBottom: 6, fontFamily: '"Source Code Pro", monospace', fontWeight: 500 }
const metaLbl = { display: 'block', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#a9a39a', fontFamily: '"Source Code Pro", monospace' }
const inp = { width: '100%', padding: '10px 14px', border: '1px solid #e8e3da', fontSize: 15, fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#2d2a26', background: '#faf8f4', outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box' }
const btnPrimary = { background: '#2d2a26', color: '#fff', border: 'none', padding: '10px 22px', cursor: 'pointer', fontSize: 12, fontFamily: '"Source Code Pro", monospace', letterSpacing: 2, textTransform: 'uppercase' }
const btnAccent = { background: '#b8860b', color: '#fff', border: 'none', padding: '7px 16px', cursor: 'pointer', fontSize: 11, fontFamily: '"Source Code Pro", monospace', letterSpacing: 1.5, textTransform: 'uppercase', transition: 'background 0.3s' }
const btnGhost = { background: 'none', color: '#7a756d', border: '1px solid #e8e3da', padding: '7px 16px', cursor: 'pointer', fontSize: 11, fontFamily: '"Source Code Pro", monospace', letterSpacing: 1.5, textTransform: 'uppercase' }
const btnDanger = { background: 'none', color: '#9b2c2c', border: '1px solid #9b2c2c30', padding: '7px 16px', cursor: 'pointer', fontSize: 11, fontFamily: '"Source Code Pro", monospace', letterSpacing: 1.5, textTransform: 'uppercase' }

export default App
