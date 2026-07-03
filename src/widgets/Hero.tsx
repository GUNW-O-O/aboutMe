import React from 'react'
import SoftAurora from '../shared/SoftAurora'
import { useTheme } from '../shared/theme'

// 배경: SoftAurora(WebGL) — 다크 테마 + 데스크톱 + 모션 허용 시에만.
// 그 외(라이트 테마·모바일·prefers-reduced-motion)는 정적 CSS 메시 그라디언트가 폴백.
// TODO(애니메이션 단계): SplitText 헤드라인 1회 등장.
const Hero: React.FC = () => {
  const theme = useTheme()
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="hero">
      <div className="hero-mesh" aria-hidden="true" />
      {theme === 'dark' && (
        <div className="hero-aurora">
          <SoftAurora />
        </div>
      )}
      <span className="badge">풀스택 개발자 · Java / Spring / React</span>
      <h1 className="t-display-xl">
        기능 구현에서 멈추지 않는<br />개발자, 고건우입니다.
      </h1>
      <p className="t-body-lg" style={{ maxWidth: '52ch' }}>
        도메인과 사용자 경험, 코드의 흐름까지 이해하며 문제를 분석하고 개선합니다.
      </p>
      <div className="cta-row">
        <button className="pill primary" onClick={scrollToProjects}>프로젝트 보기 ↓</button>
        <a className="pill secondary" href="mailto:go971230@gmail.com">go971230@gmail.com</a>
      </div>
    </header>
  )
}

export default Hero
