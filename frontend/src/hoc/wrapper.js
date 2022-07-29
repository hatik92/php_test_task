import { Navigate } from "react-router-dom"

const wrapper = (Component) => (isAuth) => {

  // const {isAuth} = useSelector(state => state.login)
    if (isAuth) {  <Navigate replace to="/login" /> }
    // return <Component />
  <Component /> 
}


export default wrapper