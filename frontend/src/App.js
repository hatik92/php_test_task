import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Book from './features/Book/Book';
import Books from './features/Books/Books';
import Navigation from './features/Nav/Nav';
import Students from './features/Students/Students';
import Student from './features/Student/Student';
import { apiConfig } from './api/api';
import Home from './features/Home/Home';

function App() {
  useEffect(() => {
    getCSRF()
    return () => {
      
    };
  }, []);

  async function getCSRF() {
    const csrf = await apiConfig.get('sanctum/csrf-cookie')
    console.log('csrf = ', csrf);

    const login = await apiConfig.post('api/login', {
      email: 'hamill.merle@example.net',
      password: 'password'
    })
    console.log('login = ', login);

    const user = await apiConfig.get('api/user')

    console.log('user = ', user);
  }
  return <>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="books" element={<Books />} >
            <Route index element={<Books />} />
            <Route path=":page" element={<Books />} />
          </Route>
          <Route path="book">
            <Route index element={
              <main style={{ padding: "1rem" }}>
                <p>Select an invoice</p>
              </main>
            } />
            <Route path=":bookId" element={<Book />} />
          </Route>
          <Route path="students" element={<Students />} >
            <Route path=":studentId" element={<Student />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter> */}
  </>
}

export default App;
