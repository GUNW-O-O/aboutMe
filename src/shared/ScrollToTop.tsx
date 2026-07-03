import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** 라우트 변경 시 스크롤 최상단 복귀 */
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
