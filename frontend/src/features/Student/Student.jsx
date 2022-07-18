import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getBook } from './bookSlice';
import { useNavigate, useLocation, useParams } from "react-router-dom";


const Book = (props) => {
  let navigate = useNavigate();
  let location = useLocation();
  let { bookId } = useParams();
  // console.log(navigate, location, bookId);
  const book = useSelector(store => store.book.book)
  const dispatch = useDispatch()
  console.log(book);
  useEffect(() => {
    dispatch(getBook(props.book ? props.book.id : bookId))
  }, [dispatch]);
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
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="assignBook" data-id="1">+ Assign</button>
          </div>
          <div>
            <ul className="list-group" id="bookObout1">
              {book.students.map(student => {
                <li className="list-group-item d-flex justify-content-between align-items-center" key={student.id} >Name: {student.surname}<button className="btn btn-danger" id="unassignBook1" data-id="1">Unassign</button></li>
              })}
            </ul>
          </div>
        </div>
      </div></div>
  )
}

export default Book