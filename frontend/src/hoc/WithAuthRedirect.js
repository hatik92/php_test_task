import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Login from "../features/Login/Login";
// import { getCurrentUser } from "../features/Login/loginSlice";

export const WithAuthRedirect = (Component) => {
  const RedirectComponent = () => {
    const { user, isAuth } = useSelector(store => store.login)
    const dispatch = useDispatch()
    // useEffect(() => {
    //   // if (!user.id) {
    //     // dispatch(getCurrentUser())
    //   // }
    // }, [dispatch]);
    // if (!isAuth) { return <Navigate to='/login' /> }
    return <Component {...isAuth} />
  }

  return RedirectComponent

}


