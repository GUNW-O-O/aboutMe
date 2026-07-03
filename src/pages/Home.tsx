import React from 'react'
import Nav from '../features/Nav'
import Hero from '../widgets/Hero'
import About from '../widgets/About'
import TechStrip from '../widgets/TechStrip'
import ProjectsGrid from '../widgets/ProjectsGrid'
import HighlightBand from '../widgets/HighlightBand'
import Timeline from '../widgets/Timeline'
import Footer from '../widgets/Footer'

const Home: React.FC = () => {
  return (
    <>
      <Nav variant="home" />
      <Hero />
      <About />
      <TechStrip />
      <ProjectsGrid />
      <HighlightBand />
      <Timeline />
      <Footer />
    </>
  )
}

export default Home
