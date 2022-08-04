import React from 'react'
import style from './notFound.module.css'
import { Link } from 'react-router-dom';

const NotFound = ({ param }) => {

  return <div>
    <div className={'text-center ' + style.notfound}>
      <span className={style.wrong_para}>Uh Oh! Something went wrong!</span>
    </div>
    <div className='d-flex justify-content-center'>
      <Link to='/'>Back to home page</Link>
    </div>
  </div>
}

export default NotFound