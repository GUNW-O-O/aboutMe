import React from 'react'

type SkillsProps = {
  skills: string[]
}

const Skills: React.FC<SkillsProps> = ({skills}) => {
  return (
    <>
    {skills.map(s => <img src={s} alt="skill"/>)}
    </>
  )
}

export default Skills