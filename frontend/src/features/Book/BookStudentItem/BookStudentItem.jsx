import Button from 'react-bootstrap/Button';

const BookStudentItem = ({ student, unassignHndler, removeProcess, index }) => {

  return <>
    <tr key={student.id} >
      <td>{index + 1}</td>
      <td>{student.name}</td>
      <td>{student.surname}</td>
      <td>{student.username}</td>
      <td>{student.return_date}</td>
      <td><Button
        variant="danger"
        onClick={() => unassignHndler(student.id)}
        disabled={removeProcess.some(st => st === student.id)}
      >Unassign</Button></td>
    </tr>
  </>
}

export default BookStudentItem