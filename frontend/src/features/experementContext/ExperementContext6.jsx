import React from 'react'
import { useContext } from 'react';
import { AppContext } from './../../App';

const ExperementContext6 = () => {
  const val  = useContext(AppContext);
  return (
    <h1 className='text-danger'>{val.toLowerCase()}</h1>
  )
}

export default ExperementContext6