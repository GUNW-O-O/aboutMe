import React from 'react'
import History from './History'
import SlideIn from '../shared/SlideIn'
import Skills from '../features/Skills'
import ScrollToTop from '../features/ScrollToTop'

const PortFolio: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <div className="port-folio">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <SlideIn delay={0.5} direction="up">
            <History />
          </SlideIn>
        </div>
        <div className="stacks">
          <div className='usually-knowledge'>
            <SlideIn delay={0.8} direction="right">
              <div className="usually bg">
                <h2>Core</h2>
                <Skills category='usually' />
              </div>
            </SlideIn>
            <SlideIn delay={1.0} direction="left">
              <div className="knowledge bg">
                <h2>Knowledge</h2>
                <Skills category='knowledge' />
              </div>
            </SlideIn>
          </div>
          <SlideIn delay={1.3} direction="up">
            <div className="etc bg">
              <h2>Etc</h2>
              <Skills category='etc' />
            </div>
          </SlideIn>
        </div>
      </div >
    </>
  )
}

export default PortFolio