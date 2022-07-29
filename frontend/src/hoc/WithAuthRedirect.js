// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from 'react-redux'

// export const withAuthRedirect = (Component) => {

//   const RedirectComponent = () => {
//     const {isAuth} = useSelector(state => state.login)
//     if (!isAuth) { return <Navigate replace to="/login" /> }
//     return <Component />
//   }

//   return RedirectComponent

// }


import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Book from './features/Book/Book';
// import Books from './features/Books/Books';
// import Navigation from './features/Nav/Nav';
// import Students from './features/Students/Students';
// import Student from './features/Student/Student';
// import Home from './features/Home/Home';
// import Login from './features/Login/Login';
import Books from './../features/Books/Books';
import Login from './../features/Login/Login';
import Home from './../features/Home/Home';
import Book from './../features/Book/Book';
import Students from './../features/Students/Students';
import Student from './../features/Student/Student';

const WithAuthRedirect = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="login" element={<Login />} />
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
    </BrowserRouter>
  )
}

export default WithAuthRedirect