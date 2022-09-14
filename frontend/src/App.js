import './App.css';
import Router from './router';
import { BrowserRouter } from 'react-router-dom';
import { Sanctum } from "react-sanctum";
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { loginAsUser } from './features/Login/loginSlice';
import ExperementContext from './features/experementContext/ExperementContext';

export const AppContext = React.createContext({})
function App() {
  const { signInRoute } = useSelector(store => store.login)
  // const dispatch = useDispatch()

  // const loginAs = sessionStorage.getItem("loginAs");
  // useEffect(() => {
  //   dispatch(loginAsUser(JSON.parse(loginAs)))
  // }, [loginAs]);
  const userObjectRoute = (loginAs) => {
    switch (loginAs) {
      case 'student':
        return "api/student"
      case 'librarian':
        return "api/user"
      case 'admin':
        return "api/admin"
      default:
        return
    }
  }
  // let userObjectRoute = null
  // JSON.parse(sessionStorage.getItem("loginAs")) ? userObjectRoute = "api/user" : userObjectRoute = "api/student"

  const sanctumConfig = {
    apiUrl: process.env.REACT_APP_API_URL,
    csrfCookieRoute: "sanctum/csrf-cookie",
    signInRoute,
    signOutRoute: "api/logout",
    userObjectRoute: userObjectRoute(sessionStorage.getItem("loginAs")),
  };

  return <>
    {/* <AppContext.Provider value='Hello World!'>
      <ExperementContext />
    </AppContext.Provider> */}
    <div className='bookParent'>
      <Sanctum config={sanctumConfig} checkOnInit={false}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Sanctum>
    </div>
  </>
}

export default App;



// https://t.me/progbook/383