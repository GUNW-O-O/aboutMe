import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SoftAurora from '../shared/SoftAurora'
import { useTheme } from '../shared/theme'

// 배경: SoftAurora(WebGL) — 다크 테마 + 데스크톱 + 모션 허용 시에만.
// 그 외(라이트 테마·모바일·prefers-reduced-motion)는 정적 CSS 메시 그라디언트가 폴백.
const Hero: React.FC = () => {
  const theme = useTheme()
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = heroRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        { autoAlpha: 0, y: 18, filter: 'blur(8px)' },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'filter,transform',
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="hero" ref={heroRef}>
      <div className="hero-mesh" aria-hidden="true" />
      {theme === 'dark' && (
        <div className="hero-aurora">
          <SoftAurora />
        </div>
      )}
      <span className="badge hero-reveal">풀스택 개발자</span>
      <h1 className="t-display-xl">
        <span className="hero-reveal">돌아가게 만드는 건,</span>
        <br />
        <span className="hero-reveal"> 이제 누구나 가능합니다.</span>
      </h1>
      <p className="t-body-lg hero-reveal" style={{ maxWidth: '60ch' }}>
        그래서 코드작성 전에 무엇을 어떻게 만들지 설계하는 데 더 많은 시간을 씁니다.
      </p>
      <div className="cta-row hero-reveal">
        <button className="pill primary" onClick={scrollToProjects}>프로젝트 보기 ↓</button>
        <a className="pill secondary" href="mailto:go971230@gmail.com">go971230@gmail.com</a>
      </div>
    </header>
  )
}

export default Hero
