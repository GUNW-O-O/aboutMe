import React from 'react'
import { Link } from 'react-router-dom'
import hhgLogo from '../assets/hhg.png'
import resonosLogo from '../assets/resonos.png'

const ProjectCard: React.FC = () => {
  return (
    <div className="reference">
      <div>
        <h2>Projects</h2>
      </div>
      <div className="projects">
        <Link className="project-card bg" to="/projects/1">
          <img src={hhgLogo} alt="" />
          <div className='project-info'>
            <h3>할건해야짐</h3>
            <p>헬스장 관리 시스템</p>
            <p>JAVA JSP MVC</p>
          </div>
        </Link>
        <Link className="project-card bg" to="/projects/2">
          <img src={resonosLogo} alt="" />
          <div className='project-info'>
            <h3>레조노스</h3>
            <p>음악 커뮤니티 플랫폼</p>
            <p>JAVA Spring React</p>
          </div>
        </Link>
        <Link className="project-card bg" to="/projects/3">
          <img src={resonosLogo} alt="" />
          <div className='project-info'>
            <h3>퀴즈웍스</h3>
            <p>타이핑 단어사전 서비스</p>
            <p>TS NestJS React</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ProjectCard