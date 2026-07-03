import React from 'react'
import Welcome from './pages/Welcome'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import ProjectList from './pages/ProjectList'
import { PersonalProjectList } from './pages/personalProject'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/main" element={<About />} />
        <Route path="/teamprojects" element={<ProjectList />} />
        <Route path="/projects" element={<PersonalProjectList />} />
      </Routes>
    </Router>
  )
}

export default App