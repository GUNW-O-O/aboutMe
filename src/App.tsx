import { useEffect, useRef, useState } from 'react'
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { projects, shortTitle, tocFor } from './content'
import { setTheme, getTheme, type Theme } from './shared/theme'
import Home from './pages/Home'

// 헤더 트랙 = 메인 + 전 문서의 ## 를 한 줄로. 문서 이름은 sticky로 왼쪽에 붙는다
const groups = [
  { id: 'home', title: 'Home', kind: '', toc: tocFor() },
  ...projects.map(d => ({ id: d.slug, title: shortTitle(d), kind: d.kind as string, toc: tocFor(d.slug) })),
]
const LINE = 0.35 // 헤딩이 화면 위에서 이 비율 지점을 지나면 현재 절 — 맨 위까지 올라오기 전에 읽기 시작하므로
const EASE = 180  // 다음 헤딩까지 이만큼 남았을 때부터 트랙이 흐른다

const goTo = (id: string) =>
  id === 'doc-home' ? window.scrollTo({ top: 0, behavior: 'smooth' })
    : document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

function Bar() {
  const wrap = useRef<HTMLDivElement>(null)
  const prog = useRef<HTMLSpanElement>(null)
  const [cur, setCur] = useState({ g: 0, h: -1 })
  const [menu, setMenu] = useState(false)
  const [theme, set] = useState<Theme>(getTheme)
  const toggleTheme = () => { const t = theme === 'dark' ? 'light' : 'dark'; setTheme(t); set(t) }

  // 세로 스크롤 위치 y ↔ 트랙 가로 위치 x 기준점. 읽는 동안은 멈추고 다음 헤딩 직전 EASE 구간에서만 흐른다
  useEffect(() => {
    const w = wrap.current!
    let pts: { y: number; x: number; g: number; h: number }[] = []
    const update = () => {
      const y = window.scrollY
      let i = 0
      while (i + 1 < pts.length && pts[i + 1].y <= y) i++
      const a = pts[i], b = pts[i + 1]
      if (!a) return
      const t = b ? Math.min(1, Math.max(0, (y - (b.y - EASE)) / EASE)) : 0
      w.scrollLeft = a.x + (b ? (b.x - a.x) * t * t * (3 - 2 * t) : 0)
      const max = document.documentElement.scrollHeight - window.innerHeight
      prog.current!.style.transform = `scaleX(${max > 0 ? y / max : 0})`
      setCur(c => (c.g === a.g && c.h === a.h ? c : { g: a.g, h: a.h }))
    }
    const measure = () => {
      const line = window.innerHeight * LINE
      const top = (el: Element) => el.getBoundingClientRect().top + window.scrollY - line
      pts = []
      ;[...w.firstElementChild!.children].forEach((grp, g) => {
        const sec = document.getElementById(`doc-${groups[g].id}`)
        if (!sec) return
        const items = grp.children as HTMLCollectionOf<HTMLElement>
        const lw = items[0].offsetWidth + 6   // 붙어 있는 문서 이름 폭만큼 비켜 세운다
        pts.push({ y: top(sec), x: (grp as HTMLElement).offsetLeft, g, h: -1 })
        groups[g].toc.forEach((t, h) => {
          const el = document.getElementById(t.id)
          if (el) pts.push({ y: top(el), x: items[h + 1].offsetLeft - lw, g, h })
        })
      })
      update()
    }
    // 이미지·폰트 로드, 스크린샷 펼침으로 본문 높이가 바뀌면 다시 잰다
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', measure)   // 창 높이만 바뀌면 body 크기는 그대로라 따로 잰다
    return () => { ro.disconnect(); window.removeEventListener('scroll', update); window.removeEventListener('resize', measure) }
  }, [])

  useEffect(() => {
    if (!menu) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    const onDown = (e: PointerEvent) => { if (!(e.target as Element).closest('.gbar, .gmenu')) setMenu(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown) }
  }, [menu])

  return (
    <>
      <header className="gbar">
        <nav className="gtrack-wrap" ref={wrap} aria-label="목차">
          <div className="gtrack">
            {groups.map((grp, g) => (
              <div key={grp.id} className="ggrp">
                <button type="button" className="glbl" aria-expanded={menu} aria-controls="gmenu"
                  onClick={() => setMenu(m => !m)}>{grp.title}</button>
                {grp.toc.map((t, h) => (
                  <button key={t.id} type="button" className={cur.g === g && cur.h === h ? 'on' : ''}
                    onClick={() => goTo(t.id)}>
                    {t.no && <span className="no">{t.no}</span>}{t.text}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </nav>
        <span className="gcount">{cur.g} / {groups.length - 1}</span>
        <button type="button" className="gtool" onClick={toggleTheme}
          aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button type="button" className="gtool" onClick={() => window.print()}>인쇄</button>
        <span className="gprog" ref={prog} />
      </header>
      {menu && (
        <nav className="gmenu" id="gmenu" aria-label="문서">
          {groups.map((grp, g) => (
            <button key={grp.id} type="button" className={cur.g === g ? 'on' : ''}
              onClick={() => { goTo(`doc-${grp.id}`); setMenu(false) }}>
              {grp.title} <span>{grp.kind}</span>
            </button>
          ))}
        </nav>
      )}
    </>
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
      <Bar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs/:slug" element={<Home />} />
        <Route path="/projects/:slug" element={<LegacyRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
