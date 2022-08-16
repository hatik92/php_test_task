import React from 'react';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { addBookToStudent } from '../../bookSlice';
import style from './studentModalItem.module.css'

const StudentModalItem = ({ student, bookId, assignedProcessStop, clearSearchValue }) => {
  const {assignedProcess} = useSelector(store => store.book)
  const dispatch = useDispatch()
  const assignHandler = (book_id, student_id) => {
    clearSearchValue()
    const payload = { book_id, student_id }
    dispatch(addBookToStudent(payload))
  }

  return <>
    <li
      className="list-group-item d-flex justify-content-between align-items-center">
      {student.name} {student.surname}
      <Button variant="success"
        className={style.btn}
        onClick={() => assignHandler(+bookId, student.id)}
        disabled={assignedProcess.some(st => st === student.id) || assignedProcessStop }
        >
        {assignedProcess.some(st => st === student.id) ? <Spinner animation="border" variant="light" size="sm" /> :
        'Assign'
        }
      </Button>
    </li>
  </>
}

export default StudentModalItem