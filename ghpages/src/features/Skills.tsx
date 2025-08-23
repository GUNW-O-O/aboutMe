import React, { useEffect, useState } from 'react'
import { usually, knowledge, etc, type Skills } from '../entities/Skills'

type SkillsProps = {
  a: number;
};

const Skills: React.FC<SkillsProps> = ({ a }) => {

  const stack: Skills[] = [
    usually,
    knowledge,
    etc
  ]

  const [skills, setSkills] = useState<Skills>([])

  useEffect(() => {
    setSkills(stack[a]);
  }, [a]);

  return (
    <>
      {skills.map((s: string, i: number) => <img src={s} alt="skill" key={i} />)}
    </>
  )
}

export default Skills