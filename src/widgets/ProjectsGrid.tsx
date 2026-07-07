import React from 'react'
import { sortedProjects } from '../entities/projects'
import { sortedProjectsV2 } from '../entities/projectsV2'
import ProjectCard from '../features/ProjectCard'

// 전환 규칙(CLAUDE.md): agent-built 3개부터 부트캠프 그룹 기본 접힘
const BOOTCAMP_FOLD_AT = 3

// 대표작(isHighlight)은 접기 밖 최상단에 노출, 나머지 부트캠프만 접기 안으로
const highlightProjects = sortedProjects.filter(p => p.isHighlight)
const foldedProjects = sortedProjects.filter(p => !p.isHighlight)

// '최신' 배지 = 표시 순서상 첫 카드 (V2 최신 → 없으면 대표작)
const latestId = (sortedProjectsV2[0] ?? highlightProjects[0] ?? foldedProjects[0])?.id

const ProjectsGrid: React.FC = () => {
  const hasTop = sortedProjectsV2.length > 0 || highlightProjects.length > 0
  return (
    <section className="section" id="projects">
      <div className="sec-head" data-reveal>
        <span className="eyebrow">projects</span>
        <h2 className="t-display-lg">프로젝트.</h2>
      </div>
      {hasTop && (
        <div className="projects-grid">
          {sortedProjectsV2.map(p => (
            <ProjectCard key={p.id} project={p} isLatest={p.id === latestId} />
          ))}
          {highlightProjects.map(p => (
            <ProjectCard key={p.id} project={p} isLatest={p.id === latestId} />
          ))}
        </div>
      )}
      <details className="p-fold" open={sortedProjectsV2.length < BOOTCAMP_FOLD_AT}>
        <summary>부트캠프 프로젝트 {foldedProjects.length}개</summary>
        <div className="projects-grid">
          {foldedProjects.map(p => (
            <ProjectCard key={p.id} project={p} isLatest={p.id === latestId} />
          ))}
        </div>
      </details>
    </section>
  )
}

export default ProjectsGrid
