import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { groupedTimeline, type TimelineItem } from '../entities/timeline'
import CertModal from '../features/CertModal'

const KIND_LABEL: Record<TimelineItem['kind'], string> = {
  project: 'project',
  education: 'education',
  certificate: 'certificate',
}

const COLLAPSED_COUNT = 3

const Timeline: React.FC = () => {
  const [cert, setCert] = useState<TimelineItem | null>(null)
  const [expanded, setExpanded] = useState(false)

  const hasMore = groupedTimeline.length > COLLAPSED_COUNT
  const collapsed = hasMore && !expanded
  const visible = collapsed ? groupedTimeline.slice(0, COLLAPSED_COUNT) : groupedTimeline

  return (
    <section className="section" id="timeline">
      <div className="sec-head" data-reveal>
        <span className="eyebrow">timeline</span>
        <h2 className="t-display-lg">지나온 길.</h2>
      </div>
      <div className={`tl ${collapsed ? 'collapsed' : ''}`}>
        {visible.map((group, idx) => (
          <div className="tl-item" key={group.key} data-reveal>
            <div className="when">{group.date}</div>
            <div className="dotcol">
              <span className="dot" />
              {(idx < visible.length - 1 || collapsed) && <span className="stem" />}
            </div>
            <div className="what">
              {group.items.map((item, i) => (
                <div className="tl-entry" key={`${item.title}-${i}`}>
                  {item.kind === 'certificate' ? (
                    <button className="tl-cert-btn" onClick={() => setCert(item)}>
                      <span>
                        <b>{item.title}</b> — {item.issuer}{' '}
                        <span className="sub">(클릭해서 확인)</span>
                      </span>
                    </button>
                  ) : item.kind === 'project' && item.projectId ? (
                    <Link to={`/projects/${item.projectId}`}>
                      <b>{item.title}</b>
                      {item.sub && <> — {item.sub}</>}
                    </Link>
                  ) : (
                    <>
                      <b>{item.title}</b>
                      {item.sub && <> — {item.sub}</>}
                    </>
                  )}
                  <div className="sub" style={{ fontFamily: 'var(--mono)', fontSize: 10.5 }}>
                    {KIND_LABEL[item.kind]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          className="tl-more btn-sq ghost"
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
        >
          {expanded
            ? '접기'
            : `이전 이력 ${groupedTimeline.length - COLLAPSED_COUNT}개 더보기`}
        </button>
      )}
      {cert && <CertModal cert={cert} onClose={() => setCert(null)} />}
    </section>
  )
}

export default Timeline
