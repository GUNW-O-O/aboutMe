import React, { useLayoutEffect, useRef, useState } from 'react'
import { techStrip, type StripRow } from '../entities/techStrip'

const SPEED_PX_PER_SEC = 40

const Row: React.FC<{ row: StripRow }> = ({ row }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(2)
  const [duration, setDuration] = useState(36)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const recompute = () => {
      const groupWidth = groupRef.current?.offsetWidth || 0
      const containerWidth = container.offsetWidth
      if (!groupWidth) return
      const needed = Math.max(2, Math.ceil(containerWidth / groupWidth) + 1)
      setCount(needed)
      setDuration((groupWidth * needed) / SPEED_PX_PER_SEC)
    }

    recompute()
    const ro = new ResizeObserver(recompute)
    ro.observe(container)
    if (groupRef.current) ro.observe(groupRef.current)
    return () => ro.disconnect()
  }, [])

  const sequences = [0, 1]
  const groups = Array.from({ length: count }, (_, i) => i)

  return (
    <div
      ref={containerRef}
      className={`strip-row flow-${row.direction}`}
      style={{ '--strip-duration': `${duration}s` } as React.CSSProperties}
    >
      <div className="strip-track">
        {sequences.map(seq => (
          <div key={`${row.label}-seq-${seq}`} className="strip-sequence" aria-hidden={seq === 1}>
            {groups.map(i => (
              <div
                key={`${row.label}-${seq}-${i}`}
                className="strip-group"
                ref={seq === 0 && i === 0 ? groupRef : undefined}
                aria-hidden={!(seq === 0 && i === 0)}
              >
                {row.direction === 'right' && <span className="dir">{row.label} →</span>}
                {row.items.map(item => (
                  <span key={item} className="lg">{item}</span>
                ))}
                {row.direction === 'left' && <span className="dir">← {row.label}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const TechStrip: React.FC = () => {
  return (
    <div className="tech-strip" aria-label="사용해 본 기술 목록">
      {techStrip.map(row => (
        <Row key={row.label} row={row} />
      ))}
    </div>
  )
}

export default TechStrip
