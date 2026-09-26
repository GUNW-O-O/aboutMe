export type Theme = 'dark' | 'light'

// data-theme이 없으면 OS 설정을 따른다 (index.css의 prefers-color-scheme)
export const getTheme = (): Theme => {
  const t = document.documentElement.dataset.theme
  if (t === 'dark' || t === 'light') return t
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const setTheme = (t: Theme) => {
  document.documentElement.dataset.theme = t
  try { localStorage.setItem('theme', t) } catch { /* 저장 불가 환경 — 이번 방문만 적용 */ }
}
