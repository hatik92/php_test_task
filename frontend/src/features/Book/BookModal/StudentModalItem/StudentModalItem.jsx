import React from 'react';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { addBookToStudent } from '../../bookSlice';

const StudentModalItem = ({ student, bookId, assignedProcessStop }) => {
  const {assignedProcess} = useSelector(store => store.book)
  const dispatch = useDispatch()
  console.log(assignedProcessStop);
  const assignHandler = (book_id, student_id) => {
    const payload = { book_id, student_id }
    dispatch(addBookToStudent(payload))
  }
  return <>
    <li
      className="list-group-item d-flex justify-content-between align-items-center">
      {student.surname}
      <Button variant="success"
        onClick={() => assignHandler(+bookId, student.id)}
        disabled={assignedProcess.some(st => st === student.id) || assignedProcessStop }
        >
        {assignedProcess.some(st => st === student.id) ? <Spinner animation="border" variant="light" /> :
        'Assign'
        }
      </Button>
    </li>
  </>
}

export default StudentModalItem