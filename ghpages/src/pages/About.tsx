import React from 'react'
import '../App.css'
import Skills from '../widgets/Skills'
import History from '../widgets/History'
import ProjectCard from '../widgets/ProjectCard'
import Info from '../widgets/Info'
import SlideIn from '../shared/SlideIn'


const About: React.FC = () => {


  return (
    <>
      <div className="about">
        <div className="container">
          <SlideIn delay={0.2} direction="up">
            <div className="title">
              <h2 className='headline'
                style={{ paddingRight: "200px" }}>
                개발자 고건우 입니다.
              </h2>
            </div>
          </SlideIn>
          <SlideIn delay={0.2} direction="up">
            <Info />
          </SlideIn>
          <SlideIn delay={0.7} direction="up">
            <div className="skills headline">
              <div className="bg">
                <h2>Skills</h2>
                <div className="stacks">
                  <Skills />
                </div>
              </div>
            </div>
          </SlideIn>
          <SlideIn delay={1.0} direction="up">
            <History />
          </SlideIn>
          <SlideIn delay={1.3} direction="up">
            <ProjectCard />
          </SlideIn>
        </div>
      </div>
    </>
  )
}

export default About