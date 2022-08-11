import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getStudent } from './studentSlice';
import style from './student.module.css';
import BookItem from './../Books/BookItem/BookItem';
import userImg from '../../images/user.png'
import BookLoader from './../../Common/Loader/BookLoader';


const Student = () => {
  const { studentId } = useParams()
  const dispatch = useDispatch()
  const { student, loading } = useSelector(store => store.student)
  useEffect(() => {
    dispatch(getStudent(studentId))
    return () => {
      // cleanup
    };
  }, [dispatch, studentId]);

  if (loading) {
    return <BookLoader />
  }

  // const student = students.find(student => student.id === studentId)
  // console.log(student);
  return <>
    <div className={"container bg-gradient mt-5 p-5 rounded-3 " + style.student}>
      <div>
        <div className='d-flex'>
          <div className='m-3'>
            <img src={student.image} className={style.studentimg} />
          </div>
          <div className='m-3'>
            <h3>{student.first_name} {student.surname}</h3>
            <p>Facultet: {student.facultet}</p>
          </div>
        </div>
      </div>
    </div>
    <div className='container shadow p-3 mb-3 rounded'>
      <div className='px-2 row row-cols-5'>
        {student.books.map((book) =>
          <BookItem key={book.id} book={book} />)}
      </div>
    </div>
  </>
}

export default Student