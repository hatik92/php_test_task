import userImg from '../../../images/user.png'
import style from './studentItem.module.css'
import { Link } from 'react-router-dom';

const StudentItem = ({ student }) => {

  return <>
    <div className={"d-flex m-2 shadow-sm p-3 rounded " + style.studentItem}>
      <div className='imgBlock'>
        <img src={student.image} />
      </div>
      <div className='info mx-4'>
        <p className='h5'>
          <Link to={'/student/' + student.id}>
            {student.first_name} {student.surname}
          </Link>
        </p>
        <p>{student.facultet}</p>
      </div>
    </div>
  </>
}

export default StudentItem