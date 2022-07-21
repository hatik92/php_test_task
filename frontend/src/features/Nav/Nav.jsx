import React, { useEffect } from 'react'
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { getBooks } from '../Books/booksSlice';

const Navigation = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const searchBookHandler = () => {
    navigate('/?search='+searchParams.get("search"), { replace: true })
  }

return <>
    <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">All books</Nav.Link>
            <Nav.Link href="book">Book</Nav.Link>
            

          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search book"
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
            <Button variant="outline-success" onClick={searchBookHandler}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />


    
  </>
}

export default Navigation