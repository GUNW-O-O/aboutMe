import React from 'react'
import { Link } from 'react-router-dom'
import type { ProjectV2 } from '../entities/projectsV2'
import { getAdjacentV2 } from '../entities/projectsV2'
import Nav from '../features/Nav'
import Footer from '../widgets/Footer'
import Img from '../shared/Img'

const FEATURED_MAX = 4

// V1 상세와 같은 골격·같은 CSS 클래스를 쓰고, agent-built 톤으로만 변형한다.
// 차이는 섹션 구성뿐 — 증거가 최상단, 문제/해결 자리에 AI 제안/기각 근거,
// 배운 점 자리에 회고, 그리고 V1에 없던 검증 규모와 알려진 한계가 붙는다.
const ProjectDetailV2: React.FC<{ project: ProjectV2 }> = ({ project }) => {
  const { prev, next } = getAdjacentV2(project.id)
  const featured = project.evidence.filter(e => e.featured).slice(0, FEATURED_MAX)
  const rest = project.evidence.filter(e => !featured.includes(e))
  const insights = project.stacks.filter(s => s.insight)

  return (
    <>
      <Nav variant="detail" />

      {/* 요약 — 채용자가 여기까지만 읽어도 판단 가능해야 함 */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="detail-summary">
          <span className="eyebrow">
            personal project · {project.sortKey.slice(0, 4)}
            {project.agentBuilt && ' · agent-built'}
          </span>
          <h1 className="t-display-lg">{project.title}</h1>
          <p className="t-body-lg" style={{ maxWidth: '60ch' }}>{project.summary}</p>
          <div className="card" style={{ padding: '20px 24px' }}>
            <dl className="meta-grid">
              <dt>기간</dt>
              <dd>{project.period}</dd>
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

      {/* 증거 — 상세 최상단. 캡션은 판단 서술이고, 짝이 되는 테스트로 검증 가능해야 한다 */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="sec-head">
          <span className="eyebrow">evidence</span>
          <h2 className="t-display-md">화면과 그 화면을 지키는 것.</h2>
        </div>
        {featured.map(e => (
          <div className="shot" key={e.src}>
            <Img src={e.src} alt={e.caption} />
            <p className="cap">
              {e.caption}
              {e.proofUrl && (
                <>
                  {' '}
                  <a href={e.proofUrl} target="_blank" rel="noopener noreferrer">
                    짝: {e.proofLabel ?? '테스트'} ↗
                  </a>
                </>
              )}
            </p>
          </div>
        ))}
        {rest.length > 0 && (
          <details className="more-shots">
            <summary>나머지 화면 {rest.length}장 더 보기</summary>
            <div className="rest">
              {rest.map(e => (
                <div className="shot" key={e.src}>
                  <Img src={e.src} alt={e.caption} />
                  <p className="cap">
                    {e.caption}
                    {e.proofUrl && (
                      <>
                        {' '}
                        <a href={e.proofUrl} target="_blank" rel="noopener noreferrer">
                          짝: {e.proofLabel ?? '테스트'} ↗
                        </a>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </details>
        )}
      </section>

      {/* AI 제안을 뒤집은 지점 — 무엇을 골랐나보다 무엇을 왜 버렸나 */}
      {project.overrides && project.overrides.length > 0 && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="sec-head">
            <span className="eyebrow">overrides</span>
            <h2 className="t-display-md">AI 말대로 갔으면 무엇이 깨졌나.</h2>
          </div>
          <div className="ts-list">
            {project.overrides.map((o, i) => (
              <article className="ts-item" key={i}>
                <span className="ts-num">
                  {String(i + 1).padStart(2, '0')} / {String(project.overrides!.length).padStart(2, '0')}
                </span>
                <div className="ts-pair">
                  <div className="t">
                    <div className="hd">AI 제안</div>
                    {o.proposal}
                  </div>
                  <div className="s">
                    <div className="hd">기각 근거</div>
                    {o.rejection}
                    <div className="rs">
                      안 막았으면: {o.consequence}
                      {o.sourceUrl && (
                        <>
                          {' '}
                          <a href={o.sourceUrl} target="_blank" rel="noopener noreferrer">
                            결정 로그 ↗
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 검증 규모 — 측정된 수치만 */}
      {project.verification && project.verification.length > 0 && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="sec-head">
            <span className="eyebrow">verification</span>
            <h2 className="t-display-md">무엇이 이 코드를 지키는가.</h2>
          </div>
          <div className="card" style={{ padding: '20px 24px' }}>
            <dl className="meta-grid">
              {project.verification.map(v => (
                <React.Fragment key={v.label}>
                  <dt>{v.label}</dt>
                  <dd>{v.value}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* 스택에서 남은 것 — 선정 이유가 아니라 이 프로젝트로 알게 된 것 */}
      {insights.length > 0 && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="sec-head">
            <span className="eyebrow">stack insights</span>
            <h2 className="t-display-md">스택에서 남은 것.</h2>
          </div>
          <div className="stack-grid">
            {insights.map(s => (
              <div key={s.name} className="card">
                <span className="chip chip-mono">{s.name}</span>
                <p className="t-body-sm" style={{ marginTop: 8 }}>{s.insight}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 설계 판단 */}
      {project.decisions && project.decisions.length > 0 && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="sec-head">
            <span className="eyebrow">decisions</span>
            <h2 className="t-display-md">무엇을 정해야 했나.</h2>
          </div>
          <div className="stack-grid">
            {project.decisions.map(d => (
              <div key={d.topic} className="card">
                <span className="eyebrow">{d.topic}</span>
                <p className="t-body-sm" style={{ marginTop: 8 }}>{d.choice}</p>
                <p className="t-body-sm" style={{ marginTop: 8, opacity: 0.8 }}>{d.reason}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 문제와 해결 */}
      {project.troubles && project.troubles.length > 0 && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="sec-head">
            <span className="eyebrow">troubleshooting</span>
            <h2 className="t-display-md">문제와 해결.</h2>
          </div>
          <div className="ts-list">
            {project.troubles.map((t, i) => (
              <article className="ts-item" key={i}>
                <span className="ts-num">
                  {String(i + 1).padStart(2, '0')} / {String(project.troubles!.length).padStart(2, '0')}
                </span>
                <div className="ts-pair">
                  <div className="t">
                    <div className="hd">Problem</div>
                    {t.problem}
                  </div>
                  <div className="s">
                    <div className="hd">Solution</div>
                    {t.solution}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 알려진 한계 — 못 한 것이 아니라 근거를 가지고 감수한 것 */}
      {project.limits && project.limits.length > 0 && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="sec-head">
            <span className="eyebrow">known limits</span>
            <h2 className="t-display-md">이 프로젝트가 증명하지 못하는 것.</h2>
          </div>
          <div className="stack-grid">
            {project.limits.map(l => (
              <div key={l.topic} className="card">
                <span className="eyebrow">{l.topic}</span>
                <p className="t-body-sm" style={{ marginTop: 8 }}>{l.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 회고 */}
      {project.retrospective && project.retrospective.length > 0 && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="sec-head">
            <span className="eyebrow">retrospective</span>
            <h2 className="t-display-md">회고.</h2>
          </div>
          <div className="card">
            {project.retrospective.map((p, i) => (
              <p key={i} className="t-body-sm" style={{ marginTop: i === 0 ? 0 : 12 }}>{p}</p>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="detail-foot-nav">
          {next ? (
            <Link className="btn-sq ghost" to={`/projects/${next.id}`}>← 이전: {next.title}</Link>
          ) : <span />}
          {prev ? (
            <Link className="btn-sq ghost" to={`/projects/${prev.id}`}>다음: {prev.title} →</Link>
          ) : (
            <Link className="btn-sq ghost" to="/">프로젝트 목록 →</Link>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default ProjectDetailV2
