import React from 'react'
import style from './home.module.css'
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector(store => store.app)
  const WELCOME_TEXT = user.id ? user.name + ' welcome to our library' : 'please login';
  return <>
    <div className='container shadow p-3 my-5 rounded h-75 text-center'>
      <h1>{WELCOME_TEXT.toUpperCase()}</h1>
    </div>
  </>
}

export default Home