import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Book from './features/Book/Book';
import Books from './features/Books/Books';
import Navigation from './features/Nav/Nav';
import Students from './features/Students/Students';
import Student from './features/Student/Student';

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Books />} />
          {/* <Route path="book" element={<Book />}> */}
          {/* <Route path=":teamId" element={<Team />} /> */}
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
          {/* <Route index element={<LeagueStandings />} /> */}
          {/* </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
    {/* <Books />
    <Book /> */}
  </>
}

export default App;
