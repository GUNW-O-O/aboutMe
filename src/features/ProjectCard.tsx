import React from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../entities/projects'
import type { ProjectV2 } from '../entities/projectsV2'
import Img from '../shared/Img'

type Props = {
  project: Project | ProjectV2 // 카드가 쓰는 필드는 공통 — V2는 type/team 없음(개인으로 표기)
  isLatest?: boolean
}

const ProjectCard: React.FC<Props> = ({ project, isLatest }) => {
  return (
    <Link
      to={`/projects/${project.id}`}
      className={`p-card ${project.isHighlight ? 'highlight' : ''}`}
      data-reveal
    >
      {project.thumbnail ? (
        <Img src={project.thumbnail} alt={`${project.title} 썸네일`} className="thumb" />
      ) : (
        <div className="thumb thumb-empty" aria-hidden="true">
          <span className="eyebrow">{project.id}</span>
        </div>
      )}
      <div className="p-title">
        {project.title}
        {'type' in project && project.type === 'team' && (
          <span className="chip">{project.team ?? '팀'}</span>
        )}
        {project.agentBuilt && <span className="chip chip-mono">agent-built</span>}
        {isLatest && <span className="chip chip-new">최신</span>}
      </div>
      <p className="p-sum">{project.summary}</p>
      <div className="p-meta">
        {project.stacks.slice(0, 4).map(s => (
          <span key={s.name} className="chip chip-mono">{s.name}</span>
        ))}
      </div>
    </Link>
  )
}

export default ProjectCard
