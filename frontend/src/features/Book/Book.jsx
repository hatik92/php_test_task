import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getBook } from './bookSlice';
import {
  useParams
} from "react-router-dom";
import BookModal from './BookModal/BookModal';
import { Button } from 'react-bootstrap';


const Book = () => {
  let { bookId } = useParams();
  const book = useSelector(store => store.book.book)
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBook(bookId))
  }, [dispatch, bookId]);
console.log(book);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div className="container">
        <div id="bookView">
          <h3>Book: {book.title.toUpperCase()}</h3>
          <p>Author: {book.author}</p>
          <p>Year: {book.year}</p>
          <p>Available count: <span id="availableCount1"> undefined</span></p>
          <div className="d-flex justify-content-between">
            <h3>students who took the book</h3>
            <Button variant="primary" onClick={handleShow}>
              + Assign
            </Button>
          </div>
          <div>
            <ul className="list-group" id="bookObout1">
              {book.students.map(student =>
                <li className="list-group-item d-flex justify-content-between align-items-center" key={student.id} >Name: {student.surname}<button className="btn btn-danger" id="unassignBook1" data-id="1">Unassign</button></li>
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