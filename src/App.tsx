import { useEffect, useState } from 'react'
import {
  HashRouter, Navigate, NavLink, Route, Routes, useLocation, useMatch, useNavigate, useParams,
} from 'react-router-dom'
import { projects, shortTitle, tocFor, type TocItem } from './content'
import { setTheme, getTheme, type Theme } from './shared/theme'
import Home from './pages/Home'
import DocPage from './pages/DocPage'
import PrintPage from './pages/PrintPage'

// 스크롤 위치 기준 현재 헤딩
function useActiveHeading(toc: TocItem[]) {
  const ids = toc.map(t => t.id).join('|')
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => {
      const list = ids.split('|')
      let cur = ''
      for (const id of list) {
        const el = id && document.getElementById(id)
        if (el && el.getBoundingClientRect().top < 120) cur = id
      }
      // 끝까지 내리면 마지막 헤딩은 위로 못 올라온다 — 바닥이면 마지막으로
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      setActive(atBottom && window.scrollY > 0 ? list[list.length - 1] : cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

function Toc({ items, onNavigate }: { items: TocItem[]; onNavigate?: () => void }) {
  const active = useActiveHeading(items)
  // 사이드바가 길면 현재 항목을 사이드바 안에서 보이게
  useEffect(() => {
    const el = active && document.querySelector<HTMLElement>(`.side .sub [data-id="${CSS.escape(active)}"]`)
    const wrap = el && el.closest<HTMLElement>('.side-scroll')
    if (!el || !wrap) return
    // scrollIntoView는 창까지 스크롤할 수 있어 사이드바만 직접 움직인다
    const e = el.getBoundingClientRect(), w = wrap.getBoundingClientRect()
    if (e.top < w.top + 16) wrap.scrollTop -= w.top + 16 - e.top
    else if (e.bottom > w.bottom - 16) wrap.scrollTop += e.bottom - (w.bottom - 16)
  }, [active])
  if (items.length < 2) return null
  return (
    <div className="sub">
      {items.map(t => (
        <button key={t.id} type="button" data-id={t.id} className={t.id === active ? 'on' : ''}
          onClick={() => { document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth' }); onNavigate?.() }}>
          {t.no && <span className="no">{t.no}</span>}
          <span className="tx">{t.text}</span>
        </button>
      ))}
    </div>
  )
}

type SidebarProps = { onNavigate?: () => void; onCollapse?: () => void }

function Sidebar({ onNavigate, onCollapse }: SidebarProps) {
  const [theme, set] = useState<Theme>(getTheme)
  const navigate = useNavigate()
  const isHome = useMatch('/') !== null
  const current = useMatch('/docs/:slug')?.params.slug
  const toggle = () => { const t = theme === 'dark' ? 'light' : 'dark'; setTheme(t); set(t) }

  return (
    <nav className="side" aria-label="프로젝트" id="sidebar">
      <div className="side-head">
        <NavLink className="home" to="/" end onClick={onNavigate}>HOME</NavLink>
        {onCollapse && (
          <button type="button" className="fold" aria-label="사이드바 접기" aria-expanded="true"
            aria-controls="sidebar" onClick={onCollapse}>«</button>
        )}
      </div>
      <div className="side-scroll">
      {isHome && <Toc items={tocFor()} onNavigate={onNavigate} />}
      <p className="label">projects</p>
      {projects.map(d => (
        <div key={d.slug}>
          <NavLink className="item" to={`/docs/${d.slug}`} onClick={onNavigate}>
            {shortTitle(d)} <span>{d.kind}</span>
          </NavLink>
          {current === d.slug && <Toc items={tocFor(d.slug)} onNavigate={onNavigate} />}
        </div>
      ))}
      </div>
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

const readCollapsed = () => {
  try { return localStorage.getItem('sidebar') === 'collapsed' } catch { return false }
}

function Layout() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)                   // 모바일 드로어
  const [collapsed, setCollapsed] = useState(readCollapsed) // PC 접기

  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const fold = (c: boolean) => {
    setCollapsed(c)
    try { localStorage.setItem('sidebar', c ? 'collapsed' : 'open') } catch { /* 이번 방문만 */ }
  }

  return (
    <div className={`shell${collapsed ? ' collapsed' : ''}`}>
      <header className="bar">
        <button type="button" aria-label={open ? '목록 닫기' : '목록 열기'} aria-expanded={open}
          onClick={() => setOpen(o => !o)}>{open ? '✕' : '☰'}</button>
        <span className="divider" aria-hidden="true" />
        <NavLink className="bar-home" to="/">HOME</NavLink>
      </header>
      {open && <button type="button" className="scrim" aria-label="목록 닫기" onClick={() => setOpen(false)} />}
      <div className={`side-wrap${open ? ' open' : ''}`}>
        {collapsed && (
          <button type="button" className="unfold" aria-label="사이드바 펼치기" aria-expanded="false"
            aria-controls="sidebar" onClick={() => fold(false)}>»</button>
        )}
        <Sidebar onNavigate={() => setOpen(false)} onCollapse={() => fold(true)} />
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
