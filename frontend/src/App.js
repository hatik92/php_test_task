import { useSelector } from 'react-redux';
import './App.css';
import BookLoader from './Common/Loader/BookLoader';
import Router from './router';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Common/Context/AuthProvider';
import { WithAuthRedirect } from './hoc/WithAuthRedirect';
import Navigation from './features/Nav/Nav';
import { Routes } from 'react-router-dom';
import { Sanctum } from "react-sanctum";


function App() {
  const sanctumConfig = {
    apiUrl: process.env.REACT_APP_API_URL,
    csrfCookieRoute: "sanctum/csrf-cookie",
    signInRoute: "api/login",
    signOutRoute: "api/logout",
    userObjectRoute: "api/user",
  };
  
  
  // useEffect(() => {
  //   dispatch(getCurrentUser())
  // }, [dispatch]);

  

  return <>
    <div className='bookParent'>
    <Sanctum config={sanctumConfig}>
      <BrowserRouter>
        {/* <Navigation /> */}
        <Router />
      </BrowserRouter>
    </Sanctum>
    </div>
  </>
}

export default App;
