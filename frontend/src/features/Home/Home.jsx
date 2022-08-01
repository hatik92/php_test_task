import React from 'react'
import style from './home.module.css'

const Home = () => {
  return <>
    <div className='container shadow p-3 my-5 rounded h-75 text-center'>
      <h1>{('welcome to our library').toUpperCase()}</h1>
    </div>
  </>
}

export default Home