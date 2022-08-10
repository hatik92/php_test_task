import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAssignStudents, getBook, removeBookToStudent } from './bookSlice';
import { useParams, useNavigate } from "react-router-dom";
import BookModal from './BookModal/BookModal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import BookStudentItem from './BookStudentItem/BookStudentItem';
import NotFound from '../../Common/404notFound/NotFound';
import BookLoader from '../../Common/Loader/BookLoader';
import bookImg from '../../images/book.jpg';
import style from './book.module.css'


const Book = () => {
  let { bookId } = useParams();
  const { book, removeProcess, loading } = useSelector(store => store.book)
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getBook(bookId));
  }, [dispatch, bookId]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    dispatch(getAssignStudents(bookId));
    setShow(true)
  };
  const unassignHndler = (student_id) => {
    const payload = { book_id: book.id, student_id }
    dispatch(removeBookToStudent(payload))
  }
  if (!loading) {
    return <BookLoader />
  }
  if (!book.id) {
    return navigate('/404')
  }
  return <>
    <div>
      {/* {book.id
      ?  */}
      <div className={"container bg-gradient mt-5 p-5 rounded-3 " + style.book}>
        <div>
          <div className='d-flex'>
            <div className='m-3'>
              <img className={style.bookImg} src={book.img ? book.img : bookImg} />
            </div>
            <div className='m-3'>
              <h3>Book: {book.title.toUpperCase()}</h3>
              <p>Author: {book.author}</p>
              <p>Year: {book.year}</p>
              <p className={book.count === book.available ? 'text-danger' : 'text-success'}>Available count: <span> {book.count - book.available}</span></p>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <h3>Students who took the book</h3>
            <Button variant="primary" onClick={handleShow}>
              + Assign
            </Button>
          </div>
          <div>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Return date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {book.students.map((student, i) =>
                  <BookStudentItem
                    key={student.id}
                    student={student}
                    unassignHndler={unassignHndler}
                    removeProcess={removeProcess}
                    index={i}
                  />
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      {/* : <div className='container'>
          <NotFound param='book' />
        </div> */}
      <BookModal
        handleClose={handleClose}
        show={show}
        bookId={bookId}
      />
    </div>
  </>
}

export default Book