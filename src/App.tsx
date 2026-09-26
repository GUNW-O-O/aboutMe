import { useEffect, useState } from 'react'
import { HashRouter, Navigate, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { projects, shortTitle } from './content'
import { setTheme, getTheme, type Theme } from './shared/theme'
import Home from './pages/Home'
import DocPage from './pages/DocPage'
import PrintPage from './pages/PrintPage'

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const [theme, set] = useState<Theme>(getTheme)
  const navigate = useNavigate()
  const toggle = () => { const t = theme === 'dark' ? 'light' : 'dark'; setTheme(t); set(t) }
  return (
    <nav className="side" aria-label="프로젝트">
      <NavLink className="home" to="/" onClick={onNavigate}>HOME</NavLink>
      <p className="label">projects</p>
      {projects.map(d => (
        <NavLink key={d.slug} className="item" to={`/docs/${d.slug}`} onClick={onNavigate}>
          {shortTitle(d)} <span>{d.kind}</span>
        </NavLink>
      ))}
      <div className="foot">
        <button type="button" className="icon" onClick={toggle}
          aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button type="button" onClick={() => { navigate('/print'); onNavigate?.() }}>인쇄</button>
      </div>
    </nav>
  )
}

function Layout() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="shell">
      <header className="bar">
        <button type="button" aria-label={open ? '목록 닫기' : '목록 열기'} aria-expanded={open}
          onClick={() => setOpen(o => !o)}>{open ? '✕' : '☰'}</button>
        <span className="divider" aria-hidden="true" />
        <NavLink className="bar-home" to="/">HOME</NavLink>
      </header>
      {open && <button type="button" className="scrim" aria-label="목록 닫기" onClick={() => setOpen(false)} />}
      <div className={`side-wrap${open ? ' open' : ''}`}>
        <Sidebar onNavigate={() => setOpen(false)} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs/:slug" element={<DocPage />} />
        <Route path="/print" element={<PrintPage />} />
        <Route path="/projects/:slug" element={<LegacyRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

// 옛 사이트 URL(/projects/:id)이 이력서 등에 남아 있을 수 있다
function LegacyRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/docs/${slug}`} replace />
}

export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  )
}
