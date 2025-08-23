import React from 'react'
import { Link } from 'react-router-dom';

type link = {
  link: string;
}
type text = {
  text : string;
}

const HrefButton: React.FC<link & text> = ({link, text}) => {
  return (
    <Link className='btn' to={link}>{text}</Link>
  )
}

export default HrefButton

