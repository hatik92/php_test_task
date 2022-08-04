import './App.css';
import Router from './router';
import { BrowserRouter } from 'react-router-dom';
import { Sanctum } from "react-sanctum";


function App() {
  const sanctumConfig = {
    apiUrl: process.env.REACT_APP_API_URL,
    csrfCookieRoute: "sanctum/csrf-cookie",
    signInRoute: "api/login",
    signOutRoute: "api/logout",
    userObjectRoute: "api/user",
  };

  return <>
    <div className='bookParent'>
      <Sanctum config={sanctumConfig}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Sanctum>
    </div>
  </>
}

export default App;
