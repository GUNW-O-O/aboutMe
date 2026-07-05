import React from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../entities/projects'
import Img from '../shared/Img'

type Props = {
  project: Project
  isLatest?: boolean
}

const ProjectCard: React.FC<Props> = ({ project, isLatest }) => {
  return (
    <Link
      to={`/projects/${project.id}`}
      className={`p-card ${project.featured ? 'featured' : ''}`}
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
        <span className="chip">
          {project.type === 'team' ? project.team ?? '팀' : '개인'}
        </span>
        {project.aiNative && <span className="chip chip-mono">AI-native</span>}
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
