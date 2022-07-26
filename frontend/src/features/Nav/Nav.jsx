import React, { useEffect } from 'react'
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { getBooks } from '../Books/booksSlice';
import { getStudents } from './../Students/studentsSlice';

const Navigation = () => {
  let location = useLocation()
  location = location.pathname.split('/')[1]
  console.log(location);

  const dispatch = useDispatch()
  useEffect(() => {
    if (location === 'books') {
      dispatch(getBooks({current_page:1}));
    } else if (location === 'students') {
      dispatch(getStudents());
    }
  }, [dispatch, location]);

  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("page"));

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
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchParams.get("search") || ""}
              onChange={(event) => {
                let search = event.target.value;
                if (search) {
                  setSearchParams({ search });
                } else {
                  setSearchParams({});
                }
              }}
            />
            {/* <Button variant="outline-success" onClick={searchBookHandler}>Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />


    
  </>
}

export default Navigation