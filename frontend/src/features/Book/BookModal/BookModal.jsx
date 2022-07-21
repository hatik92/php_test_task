import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Search from '../../Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import StudentModalItem from './StudentModalItem/StudentModalItem';
import { addBookToStudent, getAssignStudents } from '../bookSlice';


const BookModal = ({ show, handleClose, bookId }) => {
  const [searchValue, setSearchValue] = useState('');
  const assignStudents = useSelector(store => store.book.assignStudents);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAssignStudents(bookId));
  }, [dispatch, bookId]);

  const filterStudents = assignStudents.filter(student => {
    return student.surname.toLowerCase().includes(searchValue.toLowerCase())
  })

  const assignHandler = (book_id, student_id) => {
    const payload = {book_id, student_id}
    dispatch(addBookToStudent(payload))
  }

  return <>
    <Modal show={show} onHide={handleClose} scrollable={true}>
      <Modal.Header closeButton>
        <Modal.Title>Add book to students</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="assignBlock">
          <div className="input-group p-2">
            <Search
              classes='form-control'
              placeholder="Enter user name"
              value={searchValue}
              setValue={setSearchValue}
            />
          </div>
          <div id="studentsBlock">
            <ul className="list-group" id="bookAssign">
              {filterStudents.map(student =>
                <StudentModalItem key={student.id} student={student} bookId={bookId} assignHandler={assignHandler} />
              )}
            </ul>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </>
}

export default BookModal