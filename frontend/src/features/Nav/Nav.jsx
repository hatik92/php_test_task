import React, { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../Books/booksSlice';
import { getStudents } from './../Students/studentsSlice';
import { logout, getCurrentUser } from './../Login/loginSlice';
import style from './nav.module.scss'

const Navigation = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const { isAuth, user } = useSelector(store => store.login)
  const locationPathName = location.pathname.split('/')[1]
  const searchValue = searchParams.get('search')
  const currentPage = params.page
  useEffect(() => {
    if (!isAuth) {
      return navigate("/");
    } 
  }, [isAuth]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue) {
        if (locationPathName === 'books') {
          dispatch(getBooks({ current_page: 1, search: searchValue }));
          navigate("../books/1" + location.search, { replace: true });
        } else if (locationPathName === 'students') {
          dispatch(getStudents());
        }
      }
    }, 1500)
    if (!searchValue) {
      if (locationPathName === 'books') {
        dispatch(getBooks({ current_page: currentPage }));
      } else if (locationPathName === 'students') {
        dispatch(getStudents());
      }
    }
    return () => clearTimeout(delayDebounceFn)
  }, [searchValue])

  const onSearchChangeHandler = (event) => {
    let search = event.target.value;
    if (search) {
      setSearchParams({ search });
    } else {
      setSearchParams({});
    }
  }

  const logoutHandler = () => {
    dispatch(logout())
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
            {isAuth?<>
              <Link className='nav-link' to="/books">Books</Link>
            <Link className='nav-link' to="/students">Students</Link>
            </>:''}


          </Nav>
          {isAuth?<>
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
          :''}
          <Button className={style.linka} variant="outline-success">
            {!isAuth ? <Link to='/login' >LogIn</Link> : <Link to='/login' onClick={logoutHandler}>Logout</Link>}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />



  </>
}

export default Navigation