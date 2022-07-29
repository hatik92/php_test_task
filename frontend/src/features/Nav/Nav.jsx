import React, { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { getBooks } from '../Books/booksSlice';
import { getStudents } from './../Students/studentsSlice';

const Navigation = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  const locationPathName = location.pathname.split('/')[1]
  const searchValue = searchParams.get('search')
  const currentPage = params.page


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

  return <>
    <Navbar className='mb-4' bg="dark" expand="lg" variant="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/books">Books</Nav.Link>
            <Nav.Link href="/students">Students</Nav.Link>


          </Nav>
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
            {/* <Button variant="outline-success" type='submit'>Search</Button> */}
          </Form>
          <Button variant="outline-success">
            <Link to='/login' >LogIn</Link>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />



  </>
}

export default Navigation