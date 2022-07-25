import userImg from '../../../images/user.png'
const StudentItem = ({ student }) => {

  return <>
    <div className="d-flex m-2 shadow-sm p-3 mb-5 bg-white rounded">
      <div className='imgBlock'><img src={userImg} /></div>
      <div className='info mx-4 w-25'>
        <h2>Name: {student.first_name}</h2>
        <h2>Surname: {student.surname}</h2>
      </div>
    </div>
  </>
}

export default StudentItem