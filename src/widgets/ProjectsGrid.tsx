import React from 'react'
import { sortedProjects } from '../entities/projects'
import ProjectCard from '../features/ProjectCard'

const ProjectsGrid: React.FC = () => {
  return (
    <section className="section" id="projects">
      <div className="sec-head">
        <span className="eyebrow">projects</span>
        <h2 className="t-display-lg">프로젝트.</h2>
      </div>
      <div className="projects-grid">
        {sortedProjects.map((p, idx) => (
          <ProjectCard key={p.id} project={p} isLatest={idx === 0} />
        ))}
      </div>
    </section>
  )
}

export default ProjectsGrid
