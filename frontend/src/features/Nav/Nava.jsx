import React, { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import {
  // getCurrentUser,
  // getUser,
  // logout
} from '../Login/loginSlice';
// import { useSanctum } from "react-sanctum";
// import style from './nav.module.scss'
import { withSanctum } from "react-sanctum";
import { getUser } from '../../appSlice';

const Navigation = ({ authenticated, user, signIn, checkAuthentication }) => {
  // const { authenticated, user, signIn } = useSanctum();
  // const lalala = async () => {
  //   return await checkAuthentication()
  // } 
  // checkAuthentication();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  let location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  // const { isAuth, user } = useSelector(store => store.login)
  // useEffect(() => {
    // if (!authenticated && location.pathname !== '/login') {
      dispatch(getUser(user))
    //   // debugger
    //   return navigate("/login");
    // } 
    // else {
    //   debugger
    //   dispatch(getUser(user))
    //   // return navigate("/");
    // }
  // },[authenticated])
    
    
  //   dispatch(getCurrentUser())
  //   if (!isAuth) {
  //     return navigate("/");
  //   }
  // }, [location.pathname]);


  const onSearchChangeHandler = (event) => {
    let search = event.target.value;
    if (search) {
      setSearchParams({ search });
    } else {
      setSearchParams({});
    }
  }

  // const logoutHandler = () => {
  //   dispatch(logout())
  // }

  return <>
    <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
      <Container fluid>
        <Link className="navbar-brand" to="/">Library</Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {authenticated ? <>
              <Link className='nav-link' to="/books">Books</Link>
              <Link className='nav-link' to="/students">Students</Link>
            </> : ''}
          </Nav>
          {authenticated ? <>
            <Form
              className="d-flex"
              onSubmit={e => e.preventDefault()}
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchParams.get("search") || ""}
                onChange={(event) => onSearchChangeHandler(event)}
              />
            </Form>
            <span className='text-success m-2'>{user.name}</span>
          </>
            : ''}
          {!authenticated
            ? <Link className='btn btn-outline-success' to='/login' >LogIn</Link>
            : <Link className='btn btn-outline-success' to='/login'
            // onClick={logoutHandler}
            >Logout</Link>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
  </>
}

export default withSanctum(Navigation)