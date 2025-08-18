import React from 'react'
import { Link } from 'react-router-dom'
import { references } from '../entities/ProjectList'

const ProjectCard: React.FC = () => {

  const reference = references

  return (
    <div className="reference">
      <div>
        <h2>Projects</h2>
      </div>
      <div className="projects">
        {reference?.map((ref) => (
          <Link className="project-card bg" to={`/projects/${ref.id}`}>
            <img src={ref.projectLogo} alt="" />
            <div className='project-info'>
              <h3 className='headline'>{ref.title}</h3>
              <p>{ref.serviceTarget}</p>
              <p>{ref.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProjectCard