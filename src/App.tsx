import { useEffect, useRef, useState } from 'react'
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { projects, shortTitle, tocFor } from './content'
import { setTheme, getTheme, type Theme } from './shared/theme'
import Home from './pages/Home'

// 문서 순서 k ↔ 본문의 #doc-<id>. 0 = 메인
const docIds = ['home', ...projects.map(d => d.slug)]
const groups = projects.map(d => ({ title: shortTitle(d), toc: tocFor(d.slug) }))
const LINE = 0.35 // 헤딩이 화면 위에서 이 비율 지점을 지나면 현재 절
const EASE = 180  // 다음 헤딩까지 이만큼 남았을 때부터 트랙이 흐른다
const DIR = 36    // 위로 이만큼 스크롤하면 이동 면, 아래로 이만큼이면 읽기 면

/**
 * 글래스 헤더 두 면. 읽기 면 = 전 문서의 ## 를 이은 트랙(세로 스크롤에 묶여 가로로 흐름),
 * 이동 면 = Home + 프로젝트 목차(위로 스크롤하거나 메인 구간일 때).
 * 스크롤마다 리렌더하지 않도록 위치·강조는 DOM을 직접 만진다.
 */
function Bar() {
  const barRef = useRef<HTMLElement>(null)
  const [theme, set] = useState<Theme>(getTheme)
  const toggleTheme = () => { const t = theme === 'dark' ? 'light' : 'dark'; setTheme(t); set(t) }

  useEffect(() => {
    const bar = barRef.current!
    const wrap = bar.querySelector<HTMLElement>('.gtrack-wrap')!
    const track = wrap.firstElementChild!
    const index = bar.querySelector<HTMLElement>('.gindex')!
    const prog = bar.querySelector<HTMLElement>('.gprog')!
    const sec = (s: number) => document.getElementById(`doc-${docIds[s]}`)

    // 기준점: 세로 스크롤 위치 y ↔ 트랙 가로 위치 x. s = 문서 순서
    let pts: { y: number; x: number; s: number; btn?: Element }[] = []
    let lastY = window.scrollY, acc = 0, up = false, peek = false, lock = false
    let waiting: HTMLElement | null = null   // 오른쪽 끝에 붙어 대기 중인 다음 문서 이름

    const update = () => {
      if (!pts.length) return
      const y = window.scrollY
      const dy = y - lastY
      lastY = y
      if (!lock && dy) {
        if (Math.sign(dy) !== Math.sign(acc)) acc = 0
        acc += dy
        if (acc < -DIR) up = true
        if (acc > DIR) up = peek = false
      }
      const home = y < pts[0].y
      bar.classList.toggle('nav', home || up || peek)

      let i = 0
      while (i + 1 < pts.length && pts[i + 1].y <= y) i++
      const a = pts[i], b = pts[i + 1]
      const t = b ? Math.min(1, Math.max(0, (y - (b.y - EASE)) / EASE)) : 0
      wrap.scrollLeft = a.x + (b ? (b.x - a.x) * t * t * (3 - 2 * t) : 0)
      track.querySelector('.on')?.classList.remove('on')
      a.btn?.classList.add('on')

      // 이동 면: 현재 문서 강조 + 그 안에서 읽은 만큼 밑줄
      const cur = home ? 0 : a.s
      const start = cur ? pts.find(p => p.s === cur)!.y : 0
      const next = pts.find(p => p.s === cur + 1)
      const max = document.documentElement.scrollHeight - window.innerHeight
      const end = next ? next.y : max
      const p = Math.min(1, Math.max(0, (y - start) / (end - start || 1)))
      ;[...index.children].forEach((el, k) => {
        el.classList.toggle('on', k === cur)
        if (k === cur) (el as HTMLElement).style.setProperty('--p', String(p))
      })
      // 목차가 폭보다 넓을 때(폰): 현재 문서를 가운데에 두고, 읽은 만큼 다음 문서 쪽으로 흐른다
      const center = (k: number) => {
        const el = index.children[k] as HTMLElement | undefined
        return el ? el.offsetLeft - (index.clientWidth - el.offsetWidth) / 2 : 0
      }
      index.scrollLeft = center(cur) + (cur + 1 < index.children.length ? (center(cur + 1) - center(cur)) * p : 0)

      // 다음 문서 이름: 아직 트랙 밖(오른쪽)이면 오른쪽 끝으로 당겨 둔다. track.children[a.s] = 다음 문서 그룹
      const ng = track.children[a.s] as HTMLElement | undefined
      const lbl = ng?.firstElementChild as HTMLElement | undefined
      if (waiting && waiting !== lbl) { waiting.style.transform = ''; waiting.classList.remove('wait'); waiting = null }
      wrap.classList.toggle('last', !ng)
      if (ng && lbl) {
        const over = ng.offsetLeft - wrap.scrollLeft + lbl.offsetWidth - wrap.clientWidth
        lbl.style.transform = over > 0 ? `translateX(${-over}px)` : ''
        lbl.classList.toggle('wait', over > 0)
        waiting = lbl
      }
      prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`
    }

    const measure = () => {
      const line = window.innerHeight * LINE
      const top = (el: Element) => el.getBoundingClientRect().top + window.scrollY - line
      pts = []
      ;[...track.children].forEach((g, j) => {
        const el = sec(j + 1)
        if (!el) return
        const items = g.children as HTMLCollectionOf<HTMLElement>
        const lw = items[0].offsetWidth + 6   // 붙어 있는 문서 이름 폭만큼 비켜 세운다
        pts.push({ y: top(el), x: (g as HTMLElement).offsetLeft, s: j + 1 })
        groups[j].toc.forEach((t, k) => {
          const h = document.getElementById(t.id)
          if (h) pts.push({ y: top(h), x: items[k + 1].offsetLeft - lw, s: j + 1, btn: items[k + 1] })
        })
      })
      update()
    }

    // 점프 중엔 스크롤 방향을 보지 않고, 도착하면 읽기 면으로
    const unlock = () => {
      if (!lock) return
      lock = false; up = peek = false; acc = 0; lastY = window.scrollY
      update()
    }
    const jump = (go: () => void) => { lock = true; go(); setTimeout(unlock, 900) }
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as Element).closest<HTMLElement>('button')
      if (!btn) return
      const { s, h } = btn.dataset
      if (h) return jump(() => document.getElementById(h)?.scrollIntoView({ behavior: 'smooth' }))
      if (s && (!btn.classList.contains('glbl') || btn.classList.contains('wait')))
        return jump(() => +s ? sec(+s)?.scrollIntoView({ behavior: 'smooth' }) : window.scrollTo({ top: 0, behavior: 'smooth' }))
      if (btn.classList.contains('glbl')) { peek = true; update() }   // 터치: 문서 이름을 누르면 이동 면
    }

    // 이미지·폰트 로드, 스크린샷 펼침으로 본문 높이가 바뀌면 다시 잰다
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', measure)   // 창 높이만 바뀌면 body 크기는 그대로라 따로 잰다
    document.addEventListener('scrollend', unlock)
    bar.addEventListener('click', onClick)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', measure)
      document.removeEventListener('scrollend', unlock)
      bar.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <header className="gbar nav" ref={barRef}>
      <div className="gfaces">
        <nav className="gindex" aria-label="문서">
          <button type="button" data-s="0">Home</button>
          {groups.map((g, j) => (
            <button key={docIds[j + 1]} type="button" data-s={j + 1}>
              <span className="no">{String(j + 1).padStart(2, '0')}</span>{g.title}
            </button>
          ))}
        </nav>
        <nav className="gtrack-wrap" aria-label="목차">
          <div className="gtrack">
            {groups.map((g, j) => (
              <div key={docIds[j + 1]} className="ggrp">
                <button type="button" className="glbl" data-s={j + 1}>{g.title}</button>
                {g.toc.map(t => (
                  <button key={t.id} type="button" data-h={t.id}>
                    {t.no && <span className="no">{t.no}</span>}{t.text}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </nav>
      </div>
      <button type="button" className="gtool" onClick={toggleTheme}
        aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <button type="button" className="gtool gprint" onClick={() => window.print()}>인쇄</button>
      <span className="gprog" />
    </header>
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
