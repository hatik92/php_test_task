import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSanctum } from "react-sanctum";
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const { authenticated, user, signOut } = useSanctum();
  const navigate = useNavigate()
  useEffect(() => {
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
