import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 인쇄 때만 구현 화면 블록을 펼쳤다가 원래대로 돌린다 — 접힌 details 내용은 인쇄되지 않는다
let opened: HTMLDetailsElement[] = []
window.addEventListener('beforeprint', () => {
  opened = [...document.querySelectorAll<HTMLDetailsElement>('details.shots:not([open])')]
  opened.forEach(d => { d.open = true })
})
window.addEventListener('afterprint', () => { opened.forEach(d => { d.open = false }); opened = [] })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
