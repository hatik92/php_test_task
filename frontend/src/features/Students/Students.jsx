import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StudentItem from './StudentItem/StudentItem'
import {
  getStudents,
} from './studentsSlice'
import Search from './../Search/Search';

const Student = () => {

  const allStudents = useSelector(store => store.students.students)
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const filterStudents = allStudents.filter(student => {
    return student.surname.toLowerCase().includes(searchValue.toLowerCase())
  })

  return <>
    <div>
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
    </div>
  </>
}

export default Student