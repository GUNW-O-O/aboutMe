import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setTheme, useTheme } from '../shared/theme'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
]

type NavProps = {
  variant?: 'home' | 'detail'
}

const Nav: React.FC<NavProps> = ({ variant = 'home' }) => {
  const theme = useTheme()
  const [active, setActive] = useState('')
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // 현재 뷰포트 상단에 걸린 섹션을 nav에서 활성 표시 — 방향감 보조(모션 아님).
  useEffect(() => {
    if (variant !== 'home') return
    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (els.length === 0) return
    const obs = new IntersectionObserver(
      entries => {
        const hit = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id)
      },
      // 상단 nav(64px) 아래에서, 뷰포트 상위 30% 밴드에 섹션 top이 들어오면 활성
      { rootMargin: '-64px 0px -70% 0px', threshold: 0 },
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [variant])

  return (
    <nav className="nav">
      {variant === 'detail' && (
        <Link to="/" className="btn-sq ghost">← Projects</Link>
      )}
      <Link to="/" className="logo">고건우</Link>
      {variant === 'home' && (
        <div className="links">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              className={active === s.id ? 'active' : undefined}
              aria-current={active === s.id ? 'true' : undefined}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
      <div className="actions" style={variant === 'detail' ? { marginLeft: 'auto' } : undefined}>
        <button
          className="btn-sq ghost theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
          title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        <a
          className="btn-sq ghost"
          href="https://github.com/GUNW-O-O"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        {/* TODO: 이력서 PDF 준비되면 href 연결 */}
      </div>
    </nav>
  )
}

export default Nav
