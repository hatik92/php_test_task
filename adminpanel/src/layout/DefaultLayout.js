import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSanctum } from "react-sanctum";
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useDispatch } from 'react-redux';
import { getUser } from 'src/appSlice';

const DefaultLayout = () => {
  const { authenticated, user, signOut, checkAuthentication } = useSanctum();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    checkAuthentication()
    .then(res => {
      if (res && authenticated) {
        if (user.admin) {
          // navigate("/")
          dispatch(getUser(user))
        } else {
          signOut()
        }
      } else if (authenticated === false) {
        navigate("/login")
        dispatch(getUser(user))
      }
    })
    .catch(err => {
      dispatch(getUser(user))
      navigate("/500")
    })
    if (authenticated === false) {
      navigate("/login")
    }
  }, [authenticated, navigate])

  return <>
    {
      authenticated === null
        ? <h1>Loading</h1>
        : <div>
          <AppSidebar />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader />
            <div className="body flex-grow-1 px-3">
              <AppContent />
            </div>
            <AppFooter />
          </div>
        </div>
    }
  </>
}

export default DefaultLayout
