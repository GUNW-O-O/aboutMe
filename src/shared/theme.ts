import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'
const KEY = 'theme'

export const getTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'

export const setTheme = (t: Theme) => {
  document.documentElement.dataset.theme = t
  localStorage.setItem(KEY, t)
  window.dispatchEvent(new Event('themechange'))
}

export const useTheme = (): Theme => {
  const [theme, set] = useState<Theme>(getTheme)
  useEffect(() => {
    const onChange = () => set(getTheme())
    window.addEventListener('themechange', onChange)
    return () => window.removeEventListener('themechange', onChange)
  }, [])
  return theme
}
