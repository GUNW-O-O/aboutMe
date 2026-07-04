import React from 'react'
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
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="nav">
      {variant === 'detail' && (
        <Link to="/" className="btn-sq ghost">← Projects</Link>
      )}
      <Link to="/" className="logo">고건우</Link>
      {variant === 'home' && (
        <div className="links">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)}>{s.label}</button>
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
