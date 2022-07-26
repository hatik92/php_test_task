import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Search from '../../Search/Search';
import { useSelector } from 'react-redux';
import StudentModalItem from './StudentModalItem/StudentModalItem';


const BookModal = ({ show, handleClose, bookId }) => {
  const [searchValue, setSearchValue] = useState('');
  const { assignStudents, book, assignedProcessStop } = useSelector(store => store.book);

  const filterStudents = assignStudents.filter(student => {
    return (student.surname.toLowerCase().includes(searchValue.toLowerCase()) || student.first_name.toLowerCase().includes(searchValue.toLowerCase()))
  })

  return <>
    <Modal show={show} onHide={handleClose} scrollable={true}>
      <Modal.Header className=''>
        <Modal.Title className='w-100'>
        <h2 className={book.count === book.available ? 'text-danger' : 'text-success'}>Books left {book.count - book.available}</h2>
        <div className="input-group p-2">
          <Search
            classes='form-control'
            placeholder="Enter user name"
            value={searchValue}
            setValue={setSearchValue}
          />
        </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div id="studentsBlock">
            <ul className="list-group" id="bookAssign">
              {filterStudents.length ? filterStudents.map(student =>
                <StudentModalItem
                  key={student.id}
                  student={student}
                  assignedProcessStop={assignedProcessStop}
                  bookId={bookId}
                />
              ) : <div className='text-center'>
                <h1>Oops... </h1>
                <p>We could not find a student with that name</p>
              </div>}
            </ul>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </>
}

export default BookModal