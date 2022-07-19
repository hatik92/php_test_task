import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Search from '../../Search/Search';
import { getStudents } from './../../Students/studentsSlice';
import { useDispatch, useSelector } from 'react-redux';


const BookModal = ({ show, handleClose, bookId }) => {
  const [searchValue, setSearchValue] = useState('');
  const allStudents = useSelector(store => store.students.students);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStudents(bookId));
  }, [dispatch]);
  const filterStudents = allStudents.filter(student => {
    return student.surname.toLowerCase().includes(searchValue.toLowerCase())
  })
  return <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="assignBlock">
          <div className="input-group p-2">
            <Search
              classes='form-control'
              placeholder="Enter username or surname"
              value={searchValue}
              setValue={setSearchValue}
            />
            {/* <input type="text" className="form-control" placeholder="Enter username or surname"
              aria-describedby="button-addon2" id="searchValue" /> */}
            {/* <Button variant="outline-secondary">Search</Button> */}
          </div>
          <div id="studentsBlock">
            <ul className="list-group" id="bookAssign">
              {filterStudents.map(student =>
                <li
                  key={student.id}
                  className="list-group-item d-flex justify-content-between align-items-center">
                  Name: {student.surname}
                  <Button variant="success">Assign</Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  </>
}

export default BookModal