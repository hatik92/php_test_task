import { useSelector } from 'react-redux'
import StudentItem from './StudentItem/StudentItem'
import { useSearchParams } from 'react-router-dom';
import NotFound from './../../404notFound/NotFound';

const Students = () => {

  const allStudents = useSelector(store => store.students.students)
  let searchParams = useSearchParams()[0];
  const searchValue = searchParams.get("search")? searchParams.get("search"): ''
  const filterStudents = allStudents.filter(student => {
    return (student.surname.toLowerCase().includes(searchValue.toLowerCase()) || student.first_name.toLowerCase().includes(searchValue.toLowerCase()))
  })

  return <>
    {filterStudents.length ?
      (<div className='container shadow p-3 mb-5 bg-white rounded'>
      {filterStudents.map(student => 
        <StudentItem key={student.id} student={student} />
      )}
    </div>)
      : <NotFound param='Student' />}
  </>
}

export default Students