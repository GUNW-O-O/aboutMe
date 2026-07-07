import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// [data-reveal] 요소를 스크롤 진입 시 페이드+상승으로 노출.
// progressive enhancement: JS 미실행·prefers-reduced-motion이면 요소는 그대로 보임 (CSS로 숨기지 않음).
// 가독성 가드: 투명도 주채널, 이동 16px, once(재생 없음), 본문 blur 없음.
export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = gsap.utils.toArray<HTMLElement>('[data-reveal]')
    if (els.length === 0) return

    gsap.set(els, { autoAlpha: 0, y: 16, willChange: 'transform, opacity' })
    const triggers = ScrollTrigger.batch('[data-reveal]', {
      start: 'top 85%',
      once: true,
      onEnter: targets =>
        gsap.to(targets, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.06,
          clearProps: 'transform,willChange',
        }),
    })
    ScrollTrigger.refresh()

    return () => triggers.forEach(t => t.kill())
  }, [])
}
