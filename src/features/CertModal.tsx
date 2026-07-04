import React, { useEffect } from 'react'
import type { TimelineItem } from '../entities/timeline'

type Props = {
  cert: TimelineItem
  onClose: () => void
}

const CertModal: React.FC<Props> = ({ cert, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={cert.title}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="t-display-sm">{cert.title}</div>
            <div className="t-caption">{cert.date} · {cert.issuer}</div>
          </div>
          <button className="btn-sq ghost" onClick={onClose} aria-label="닫기">✕</button>
        </div>
        {cert.img && <img src={cert.img} alt={`${cert.title} 자격증`} />}
      </div>
    </div>
  )
}

export default CertModal
