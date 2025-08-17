import React from 'react'
import Welcome from './pages/Welcome'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Projects from './pages/Projects'
import About from './pages/About'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/main" element={<About />} />
        <Route path="/projects/:id" element={<Projects />} />
      </Routes>
    </Router>
  )
}

export default App