import React from 'react'
import DarkVeil from '../shared/DarkVeil';
import TrueFocus from '../shared/TrueFocus';
import HrefButton from '../features/HrefButton';
import '../App.css'

const Welcome: React.FC = () => {


  return (
    <>
      <div className='darkveil' style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%', zIndex: -1
      }}>
        <DarkVeil/>
      </div>
      <div className='welcome'>
        <div className="title">
          <TrueFocus
            sentence="Programmer != Developer"
            manualMode={false}
            blurAmount={7}
            borderColor="royalblue"
            animationDuration={2}
            pauseBetweenAnimations={1}
          />
        </div>
          <h2>Full Stack <strong style={{color:"#3B82F6"}}>Developer</strong> 고건우's PortFolio.</h2>
        <div className="link">
          <HrefButton link={"/main"} text={"포트폴리오"} />
          <a className='btn' href="https://github.com/GUNW-O-O/" target="_blank" rel="noopener noreferrer">Git</a>
        </div>
      </div>
    </>
  )
}

export default Welcome