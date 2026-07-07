import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProject, getAdjacent } from '../entities/projects'
import Nav from '../features/Nav'
import Footer from '../widgets/Footer'
import Img from '../shared/Img'

const FEATURED_MAX = 4

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const project = id ? getProject(id) : undefined

  if (!project) return <Navigate to="/" replace />

  const { prev, next } = getAdjacent(project.id)
  const featured = project.screenshots.filter(s => s.featured).slice(0, FEATURED_MAX)
  const rest = project.screenshots.filter(s => !featured.includes(s))

  return (
    <>
      <Nav variant="detail" />

      {/* 요약 — 채용자가 여기까지만 읽어도 판단 가능해야 함 */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="detail-summary">
          <span className="eyebrow">
            {project.type === 'team' ? 'team project' : 'personal project'} · {project.sortKey.slice(0, 4)}
            {project.agentBuilt && ' · agent-built'}
          </span>
          <h1 className="t-display-lg">{project.title}</h1>
          <p className="t-body-lg" style={{ maxWidth: '60ch' }}>{project.summary}</p>
          <div className="card" style={{ padding: '20px 24px' }}>
            <dl className="meta-grid">
              <dt>기간</dt>
              <dd>{project.period}</dd>
              {project.team && (
                <>
                  <dt>인원</dt>
                  <dd>{project.team}</dd>
                </>
              )}
              <dt>스택</dt>
              <dd>
                {project.stacks.map(s => (
                  <span key={s.name} className="chip chip-mono">{s.name}</span>
                ))}
              </dd>
              <dt>링크</dt>
              <dd>
                {project.links.map(l => (
                  <a
                    key={l.url}
                    className="btn-sq ghost"
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                  </a>
                ))}
              </dd>
            </dl>
          </div>
        </div>
      </section>

      {/* 역할 / 배운 점 */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="two-col">
          <div className="card">
            <span className="eyebrow">담당 역할</span>
            <ul className="role-list">
              {project.roles.map(r => (
                <li key={r} className="t-body-sm">{r}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <span className="eyebrow">배운 점</span>
            <p className="t-body-sm" style={{ marginTop: 10 }}>
              {project.learnings || '.'}
            </p>
          </div>
        </div>
      </section>

      {/* 기술 선택 이유 — reason 있는 것만 */}
      {project.stacks.some(s => s.reason) && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="sec-head">
            <span className="eyebrow">stack decisions</span>
            <h2 className="t-display-md">기술 선정 이유.</h2>
          </div>
          <div className="stack-grid">
            {project.stacks.filter(s => s.reason).map(s => (
              <div key={s.name} className="card">
                <span className="chip chip-mono">{s.name}</span>
                <p className="t-body-sm" style={{ marginTop: 8 }}>{s.reason}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 트러블슈팅 */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="sec-head">
          <span className="eyebrow">troubleshooting</span>
          <h2 className="t-display-md">문제와 해결.</h2>
        </div>
        <div className="ts-list">
          {project.troubles.map((t, i) => (
            <article className="ts-item" key={i}>
              <span className="ts-num">
                {String(i + 1).padStart(2, '0')} / {String(project.troubles.length).padStart(2, '0')}
              </span>
              <div className="ts-pair">
                <div className="t">
                  <div className="hd">Problem</div>
                  {t.problem}
                  {t.approach && <div className="rs">{t.approach}</div>}
                </div>
                <div className="s">
                  <div className="hd">Solution</div>
                  {t.solution}
                  {t.result && <div className="rs">결과: {t.result}</div>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 스크린샷 — 없는 프로젝트는 섹션 생략 */}
      <section className="section">
        {project.screenshots.length > 0 && (
          <div className="sec-head">
            <span className="eyebrow">screenshots</span>
            <h2 className="t-display-md">구현 내용.</h2>
          </div>
        )}
        {featured.map(s => (
          <div className="shot" key={s.src}>
            <Img src={s.src} alt={s.caption} />
            <p className="cap">{s.caption}</p>
          </div>
        ))}
        {rest.length > 0 && (
          <details className="more-shots">
            <summary>나머지 스크린샷 {rest.length}장 더 보기</summary>
            <div className="rest">
              {rest.map(s => (
                <div className="shot" key={s.src}>
                  <Img src={s.src} alt={s.caption} />
                  <p className="cap">{s.caption}</p>
                </div>
              ))}
            </div>
          </details>
        )}

        <div className="detail-foot-nav">
          {next ? (
            <Link className="btn-sq ghost" to={`/projects/${next.id}`}>← 이전: {next.title}</Link>
          ) : <span />}
          {prev ? (
            <Link className="btn-sq ghost" to={`/projects/${prev.id}`}>다음: {prev.title} →</Link>
          ) : <span />}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default ProjectDetail
