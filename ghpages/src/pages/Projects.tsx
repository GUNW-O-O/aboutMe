import React from 'react'
import { useParams } from 'react-router-dom';
import ProjectDetail from '../widgets/ProjectDetail';

const Projects: React.FC = () => {

  const { id } = useParams<{ id: string }>();

  return (
    <div className='detail'>
      <ProjectDetail id={id} />
    </div>
  )
}

export default Projects