import { Routes, Route } from "react-router-dom";
import Book from './features/Book/Book';
import Books from './features/Books/Books';
import Navigation from './features/Nav/Nav';
import Students from './features/Students/Students';
import Student from './features/Student/Student';
import Home from './features/Home/Home';
import Login from './features/Login/Login';
import BookLoader from "./Common/Loader/BookLoader";
import { useSelector } from "react-redux";
import NotFound from "./Common/404notFound/NotFound";
import ServerError from './Common/ServerError/ServerError';

function Router() {
  const { initializad } = useSelector(store => store.app)

  return <>
    <Navigation />
    {!initializad ? <BookLoader /> : <Routes>
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
      <Route path="404" element={<NotFound />} />
      <Route path="500" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>}
  </>
}

export default Router;
