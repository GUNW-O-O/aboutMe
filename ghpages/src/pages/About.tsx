import React from 'react'
import '../App.css'
import Info from '../widgets/Info'
import SlideIn from '../shared/SlideIn'
import PortFolio from '../widgets/PortFolio'


const About: React.FC = () => {


  return (
    <>
      <div className="about">
        <div className="container">
          {/* <SlideIn delay={0.2} direction="up">
            <div className="title">
              <h2 className='headline'
                style={{ paddingRight: "200px" }}>
                개발자 고건우 입니다.
              </h2>
            </div>
          </SlideIn> */}
          <SlideIn delay={0.2} direction="up">
            <Info />
          </SlideIn>
          <PortFolio />
          {/* <SlideIn delay={0.8} direction="up">
            <ProjectCard />
          </SlideIn> */}
        </div>
      </div>
    </>
  )
}

export default About