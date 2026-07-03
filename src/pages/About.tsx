import React from 'react'
import '../App.css'
import Info from '../widgets/Info'
import SlideIn from '../shared/SlideIn'
import PortFolio from '../widgets/PortFolio'
import LightRays from '../shared/LightRays'


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
        <LightRays
          raysOrigin="bottom-center"
          raysColor="#00ffff"
          pulsating={false}
          raysSpeed={1}
          lightSpread={0.8}
          rayLength={1.3}
          followMouse={true}
          mouseInfluence={0.1}
          className="custom-rays"
        />
      </div>
    </>
  )
}

export default About