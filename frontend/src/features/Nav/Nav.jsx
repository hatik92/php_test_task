import React, { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useSanctum } from "react-sanctum";
import { getUser } from '../../appSlice';

const Navigation = () => {
  const { authenticated, user, signOut, checkAuthentication } = useSanctum();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  let location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    checkAuthentication()
    .then(res => {
      if (res && authenticated) {
        dispatch(getUser(user))
      } else if (authenticated === false) {
        navigate("/login")
        dispatch(getUser(user))
      }
    })
    .catch(err => {
      dispatch(getUser(user))
      navigate("/500")
    })
  }, [location.pathname, authenticated, dispatch, navigate, user])

  const onSearchChangeHandler = (event) => {
    let search = event.target.value;
    if (search) {
      setSearchParams({ search });
    } else {
      setSearchParams({});
    }
  }

  const logoutHandler = () => {
    signOut()
  }

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
            {(location.pathname.split('/')[1] === 'books' || location.pathname.split('/')[1] === 'students') && <Form
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
            </Form>}
            <span className='text-success m-2'>{user.name}</span>
          </>
            : ''}
          {!authenticated
            ? <Link className='btn btn-outline-success' to='/login' >LogIn</Link>
            : <Link className='btn btn-outline-success' to='/login'
              onClick={logoutHandler}
            >Logout</Link>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
  </>
}

export default Navigation