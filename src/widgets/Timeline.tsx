import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { groupedTimeline, type TimelineItem } from '../entities/timeline'
import CertModal from '../features/CertModal'

const KIND_LABEL: Record<TimelineItem['kind'], string> = {
  project: 'project',
  education: 'education',
  certificate: 'certificate',
}

const Timeline: React.FC = () => {
  const [cert, setCert] = useState<TimelineItem | null>(null)

  return (
    <section className="section" id="timeline">
      <div className="sec-head">
        <span className="eyebrow">timeline</span>
        <h2 className="t-display-lg">지나온 길.</h2>
      </div>
      <div className="tl">
        {groupedTimeline.map((group, idx) => (
          <div className="tl-item" key={group.key}>
            <div className="when">{group.date}</div>
            <div className="dotcol">
              <span className="dot" />
              {idx < groupedTimeline.length - 1 && <span className="stem" />}
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
      {cert && <CertModal cert={cert} onClose={() => setCert(null)} />}
    </section>
  )
}

export default Timeline
