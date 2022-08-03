import React from 'react'
import style from './notFound.module.css'

const NotFound = ({ param }) => {

  return <div className={'text-center ' + style.notfound}>
    <span className={style.wrong_para}>Uh Oh! Something went wrong!</span>
  </div>
}

export default NotFound