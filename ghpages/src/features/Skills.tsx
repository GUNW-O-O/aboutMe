import React from 'react'
import { usually, knowledge, etc, type Stacks } from '../entities/Skills'

type SkillsProps = {
  category: 'usually' | 'knowledge' | 'etc';
};

const Skills: React.FC<SkillsProps> = ({ category }) => {

  const stack: Record<SkillsProps['category'], Stacks> = {
    usually,
    knowledge,
    etc
  };

  const skills = stack[category];

  return (
    <>
      {skills.map((s: string, i: number) => <img src={s} alt="skill" key={i} />)}
    </>
  )
}

export default Skills