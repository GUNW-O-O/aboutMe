import React from 'react'
import DarkVeil from '../shared/DarkVeil';
import '../App.css'
import { Link } from 'react-router-dom';
import TrueFocus from '../shared/TrueFocus';

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
        <div className="link">
          <Link className='btn' to="/main">포트폴리오</Link>
          <a className='btn' href="https://github.com/GUNW-O-O/" target="_blank" rel="noopener noreferrer">깃허브</a>
        </div>
      </div>
    </>
  )
}

export default Welcome