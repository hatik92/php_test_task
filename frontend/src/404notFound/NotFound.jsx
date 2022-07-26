import React from 'react'
import style from './notFound.module.css'

const NotFound = ({param}) => {
  
  return <>
    <div className={style.container}>
      <h1 className={style.first_four}>4</h1>
      <div className={style.cog_wheel1}>
        <div className={style.cog1}>
          <div className={style.top}></div>
          <div className={style.down}></div>
          <div className={style.left_top}></div>
          <div className={style.left_down}></div>
          <div className={style.right_top}></div>
          <div className={style.right_down}></div>
          <div className={style.left}></div>
          <div className={style.right}></div>
        </div>
      </div>

      <div className={style.cog_wheel2}>
        <div className={style.cog2}>
          <div className={style.top}></div>
          <div className={style.down}></div>
          <div className={style.left_top}></div>
          <div className={style.left_down}></div>
          <div className={style.right_top}></div>
          <div className={style.right_down}></div>
          <div className={style.left}></div>
          <div className={style.right}></div>
        </div>
      </div>
      <h1 className={style.second_four}>4</h1>
      <p className={style.wrong_para}>Uh Oh! {param} not found!</p>
    </div>
  </>
}

export default NotFound