import React from 'react'
import History from '../widgets/History'
import SlideIn from '../shared/SlideIn'

const PortFolio: React.FC = () => {
  return (
    <>
      <div className="port-folio">
        <SlideIn delay={0.8} direction="left">
          <History />
        </SlideIn>
      </div>
    </>
  )
}

export default PortFolio