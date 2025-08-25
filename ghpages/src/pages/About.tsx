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
          <SlideIn delay={0.2} direction="up">
            <Info />
          </SlideIn>
          <PortFolio />
        </div>
      </div>
    </>
  )
}

export default About