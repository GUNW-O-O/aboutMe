import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { sortedCareer, type CareerItem } from '../entities/career'
import CertModal from '../features/CertModal'

const KIND_LABEL: Record<CareerItem['kind'], string> = {
  project: 'project',
  education: 'education',
  certificate: 'certificate',
}

const Timeline: React.FC = () => {
  const [cert, setCert] = useState<CareerItem | null>(null)

  return (
    <section className="section" id="career">
      <div className="sec-head">
        <span className="eyebrow">career</span>
        <h2 className="t-display-lg">지나온 길.</h2>
      </div>
      <div className="tl">
        {sortedCareer.map((item, idx) => (
          <div className="tl-item" key={`${item.title}-${idx}`}>
            <div className="when">{item.date}</div>
            <div className="dotcol">
              <span className="dot" />
              {idx < sortedCareer.length - 1 && <span className="stem" />}
            </div>
            <div className="what">
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
          </div>
        ))}
      </div>
      {cert && <CertModal cert={cert} onClose={() => setCert(null)} />}
    </section>
  )
}

export default Timeline
