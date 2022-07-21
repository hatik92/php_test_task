import React from 'react'
import { Button } from 'react-bootstrap'

const StudentModalItem = ({ student, bookId, assignHandler }) => {

  return <>
    <li
      className="list-group-item d-flex justify-content-between align-items-center">
      {student.surname}
      <Button variant="success" onClick={() => assignHandler(+bookId, student.id)}>Assign</Button>
    </li>
  </>
}

export default StudentModalItem