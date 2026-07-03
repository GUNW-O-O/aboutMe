import React from 'react'
import { techStrip } from '../entities/techStrip'

// 골조 단계: 정적 3줄. TODO(애니메이션 단계): LogoLoop ×3 — 줄마다 방향 엇갈림,
// 저속 + hover pause, prefers-reduced-motion 시 정지.
const TechStrip: React.FC = () => {
  return (
    <div className="tech-strip" aria-label="사용해 본 기술 목록">
      {techStrip.map(row => (
        <div key={row.label} className={`strip-row ${row.direction === 'left' ? 'rev' : ''}`}>
          {row.direction === 'right' && <span className="dir">{row.label} →</span>}
          {row.items.map(item => (
            <span key={item} className="lg">{item}</span>
          ))}
          {row.direction === 'left' && <span className="dir">← {row.label}</span>}
        </div>
      ))}
    </div>
  )
}

export default TechStrip
