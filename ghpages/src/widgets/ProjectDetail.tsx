import React, { useState } from 'react'
import { projectObjs } from '../entities/ProjectObj'
import '../App.css'

type ProjectDetailProps = {
  id: string | undefined;
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ id }) => {
  
  const [isLoaded, setIsLoaded] = useState(false);

  const project = projectObjs.find(p => p.id === Number(id))


  return (
    <div className="project-wrapper">
      <div className="container">
        <div className="head">
          <h1>{project?.title}</h1>
          <div className='info bg'>
            <div className="desc">
              <p>{project?.description}</p>
              <a className='btn' href={project?.repo} target="_blank" rel="noopener noreferrer">프로젝트 리포지토리</a>
            </div>
            <div className="logo">
              <img src={project?.projectLogo} alt=""
                className={`fade-in ${isLoaded ? 'loaded' : ''}`}
                onLoad={() => setIsLoaded(true)} />
            </div>
          </div>
        </div>
        <div className="body">
          <div className='bg'>
            <h2>담당역할</h2>
            {project?.images.map((img, idx) => (
              <div key={idx} className="image-box">
                <img src={img} alt={project.imgDesc[idx]}
                  className={`fade-in ${isLoaded ? 'loaded' : ''}`}
                  onLoad={() => setIsLoaded(true)} />
                <p className="img-desc">{project.imgDesc[idx]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="footer">
          <div className="end bg">
            <h2>결론</h2>
            <div className='box'>
              <div className="imp">
                <h3>개선점</h3>
                <p>{project?.improvements}</p>
              </div>
              <div className="ref">
                <h3>배운점</h3>
                <p>{project?.reflections}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail