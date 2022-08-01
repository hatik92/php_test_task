import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Book from './features/Book/Book';
import Books from './features/Books/Books';
import Navigation from './features/Nav/Nav';
import Students from './features/Students/Students';
import Student from './features/Student/Student';
import Home from './features/Home/Home';
import Login from './features/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Common/Loader/Loader';
import { getCurrentUser } from './features/Login/loginSlice';

function App() {
  const { initializad, isAuth } = useSelector(store => store.login)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch]); 

  if (!initializad) {
    return <Loader />
  }
  
  return <>
  <div className='bookParent'>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}></Route>
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
        
      </Routes>
    </BrowserRouter>

  </div>
  </>
}

export default App;
