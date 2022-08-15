import './App.css';
import Router from './router';
import { BrowserRouter } from 'react-router-dom';
import { Sanctum } from "react-sanctum";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginAsUser } from './features/Login/loginSlice';


function App() {
  const {signInRoute, signOutRoute, userObjectRoute} = useSelector(store => store.login)
  // const dispatch = useDispatch()
  
  // const loginAs = localStorage.getItem("loginAs");
  // useEffect(() => {
  //   dispatch(loginAsUser(JSON.parse(loginAs)))
  // }, [loginAs]);
  const sanctumConfig = {
    apiUrl: process.env.REACT_APP_API_URL,
    csrfCookieRoute: "sanctum/csrf-cookie",
    signInRoute,
    signOutRoute: "api/logout",
    userObjectRoute,
  };
  console.log(signInRoute, signOutRoute, userObjectRoute);
  return <>
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
