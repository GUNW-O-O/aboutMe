import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { sortedProjects } from '../entities/projects'
import Img from '../shared/Img'

const SWIPE_THRESHOLD = 40

// 골조 단계: 수동 전환(밴드 좌우 화살표/드래그).
// TODO(애니메이션 단계): CardSwap — 자동 교체, hover pause,
// prefers-reduced-motion 시 자동재생 없음.
const HighlightBand: React.FC = () => {
  const items = sortedProjects.filter(p => p.highlight)
  const [active, setActive] = useState(0)
  const dragStartX = useRef<number | null>(null)
  const dragged = useRef(false)

  if (items.length === 0) return null

  const count = items.length
  const go = (dir: 1 | -1) => setActive(i => (i + dir + count) % count)

  const order = (offset: number) => items[(active + offset) % count]
  const top = order(0)
  const b1 = count > 1 ? order(1) : undefined
  const b2 = count > 2 ? order(2) : undefined

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX
    dragged.current = false
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return
    const delta = e.clientX - dragStartX.current
    dragStartX.current = null
    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      dragged.current = true
      go(delta < 0 ? 1 : -1)
    }
  }
  // 드래그였다면 카드 링크 클릭 무시
  const onCardClick = (e: React.MouseEvent) => {
    if (dragged.current) {
      e.preventDefault()
      dragged.current = false
    }
  }

  return (
    <section className="band">
      <button className="band-arrow left" onClick={() => go(-1)} aria-label="이전 하이라이트">
        &#8249;
      </button>
      <button className="band-arrow right" onClick={() => go(1)} aria-label="다음 하이라이트">
        &#8250;
      </button>

      <div className="inner">
        <div>
          <span className="eyebrow">highlights</span>
          <h2 className="t-display-lg">상세에서 볼 수 있는 것들.</h2>
          <p className="t-body-md lead">
            각 프로젝트 상세 페이지의 핵심 장면입니다. 카드를 클릭하면 해당
            상세로 이동합니다.
          </p>
          <div className="swap-dots" aria-hidden="true">
            {items.map((p, i) => (
              <i key={p.id} className={i === active ? 'on' : ''} />
            ))}
          </div>
        </div>
        <div
          className="swap-stack"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {b2 && (
            <div className="swap-card b2" aria-hidden="true">
              <Img src={b2.highlight!.src} alt="" />
            </div>
          )}
          {b1 && (
            <div className="swap-card b1" aria-hidden="true">
              <Img src={b1.highlight!.src} alt="" />
            </div>
          )}
          <Link
            to={`/projects/${top.id}`}
            className="swap-card top"
            onClick={onCardClick}
            draggable={false}
          >
            <Img src={top.highlight!.src} alt={`${top.title} — ${top.highlight!.caption}`} />
            <div className="sc-cap">
              <span>{top.highlight!.caption}</span>
              <span className="go">{top.title} →</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HighlightBand
