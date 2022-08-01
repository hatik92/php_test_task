import { useDispatch, useSelector } from 'react-redux'
import StudentItem from './StudentItem/StudentItem'
import { useSearchParams } from 'react-router-dom';
import NotFound from '../../Common/404notFound/NotFound';
import { getStudents } from './studentsSlice';
import { useEffect } from 'react';

const Students = () => {

  const {students: allStudents} = useSelector(store => store.students)
  let searchParams = useSearchParams()[0];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);
  const searchValue = searchParams.get("search")? searchParams.get("search"): ''
  const filterStudents = allStudents.filter(student => {
    return (student.surname.toLowerCase().includes(searchValue.toLowerCase()) || student.first_name.toLowerCase().includes(searchValue.toLowerCase()))
  })

  return <>
    {filterStudents.length ?
      (<div className='container shadow p-3 mb-3 rounded'>
      {filterStudents.map(student => 
        <StudentItem key={student.id} student={student} />
      )}
    </div>)
      : <NotFound param='Student' />}
  </>
}

export default Students