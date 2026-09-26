import { useEffect } from 'react'

export type LightboxItem = { src: string; title: string; sub?: string }

export default function Lightbox({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title}>
      <button type="button" className="lightbox-scrim" aria-label="닫기" onClick={onClose} />
      <figure className="lightbox-card">
        <figcaption>
          <span><b>{item.title}</b>{item.sub && <i>{item.sub}</i>}</span>
          <button type="button" onClick={onClose} aria-label="닫기" autoFocus>✕</button>
        </figcaption>
        <img src={item.src} alt={item.title} />
      </figure>
    </div>
  )
}
