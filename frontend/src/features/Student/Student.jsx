import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
// import { getBook } from './bookSlice';
import { useNavigate, useLocation, useParams } from "react-router-dom";


const Student = (props) => {
  let navigate = useNavigate();
  let location = useLocation();
  let { bookId } = useParams();
  // console.log(navigate, location, bookId);
  const book = useSelector(store => store.book.book)
  const dispatch = useDispatch()
  console.log(book);
  // useEffect(() => {
  //   dispatch(getBook(props.book ? props.book.id : bookId))
  // }, [dispatch]);
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
              <li className="list-group-item d-flex justify-content-between align-items-center" id="unassign1">Name: Alvah Kerluke<button className="btn btn-danger" id="unassignBook1" data-id="1">Unassign</button></li>
              <li className="list-group-item d-flex justify-content-between align-items-center" id="unassign3">Name: Prof. Vance Berge<button className="btn btn-danger" id="unassignBook3" data-id="3">Unassign</button></li>
              <li className="list-group-item d-flex justify-content-between align-items-center" id="unassign5">Name: Mr. Stevie West V<button className="btn btn-danger" id="unassignBook5" data-id="5">Unassign</button></li>
              <li className="list-group-item d-flex justify-content-between align-items-center" id="unassign7">Name: Joshuah Shields<button className="btn btn-danger" id="unassignBook7" data-id="7">Unassign</button></li>
              <li className="list-group-item d-flex justify-content-between align-items-center" id="unassign11">Name: Dr. Ahmed Bogan<button className="btn btn-danger" id="unassignBook11" data-id="11">Unassign</button></li>
              <li className="list-group-item d-flex justify-content-between align-items-center" id="unassign14">Name: Justyn Bernhard<button className="btn btn-danger" id="unassignBook14" data-id="14">Unassign</button></li>
              <li className="list-group-item d-flex justify-content-between align-items-center" id="unassign17">Name: Manuel Berge<button className="btn btn-danger" id="unassignBook17" data-id="17">Unassign</button></li>
              <li className="list-group-item d-flex justify-content-between align-items-center" id="unassign20">Name: Reyna Mohr<button className="btn btn-danger" id="unassignBook20" data-id="20">Unassign</button></li>
            </ul>
          </div>
        </div>
      </div></div>
  )
}

export default Student