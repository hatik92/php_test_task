import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StudentItem from './StudentItem/StudentItem'
import ListGroup from 'react-bootstrap/ListGroup';

import {
  getStudents,
} from './studentsSlice'
import Search from './../Search/Search';

const Students = () => {

  const allStudents = useSelector(store => store.students.students)
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const filterStudents = allStudents.filter(student => {
    return student.surname.toLowerCase().includes(searchValue.toLowerCase())
  })
  console.log(filterStudents);
  return <>
    {/* <div>
      <Search
        value={searchValue}
        setValue={setSearchValue}
      />
      <div>
        {
          filterStudents.map((student, i) =>
            <StudentItem key={i} student={student} />
          )
        }
      </div>
    </div> */}
    <div className='container shadow p-3 mb-5 bg-white rounded'>
      {filterStudents.map(student => 
        <StudentItem key={student.id} student={student} />
      )}
    </div>
    
  </>
}

export default Students