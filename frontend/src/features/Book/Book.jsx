import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAssignStudents, getBook, removeBookToStudent } from './bookSlice';
import {
  useParams
} from "react-router-dom";
import BookModal from './BookModal/BookModal';
import { Button } from 'react-bootstrap';


const Book = () => {
  let { bookId } = useParams();
  const { book, removeProcess } = useSelector(store => store.book)
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBook(bookId));
  }, [dispatch, bookId]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    dispatch(getAssignStudents(bookId));
    setShow(true)
  };
  const unassignHndler = (book_id, student_id) => {
    const payload = { book_id, student_id }
    dispatch(removeBookToStudent(payload))
  }
  return (
    <div>
      <div className="container">
        <div id="bookView">
          <h3>Book: {book.title.toUpperCase()}</h3>
          <p>Author: {book.author}</p>
          <p>Year: {book.year}</p>
          <p>Available count: <span id="availableCount1"> {book.count - book.available}</span></p>
          <div className="d-flex justify-content-between">
            <h3>students who took the book</h3>
            <Button variant="primary" onClick={handleShow}>
              + Assign
            </Button>
          </div>
          <div>
            <ul className="list-group" id="bookObout1">
              {book.students.map(student =>
                <li className="list-group-item d-flex justify-content-between align-items-center" key={student.id} >
                  <span>Name: {student.surname}</span>
                  <Button
                    variant="danger"
                    onClick={() => unassignHndler(book.id, student.id)}
                    disabled={removeProcess.some(st => st === student.id)}
                  >Unassign</Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <BookModal
        handleClose={handleClose}
        show={show}
        bookId={bookId}
      />
    </div>
  )
}

export default Book