import React from 'react'
import { useSelector } from 'react-redux'


const Student = () => {
  const {student} = useSelector(store => store.student)
  
  return (
    <div>
      <div className="container">
        <div>
          <h3>Full name: {student.first_name} {student.surname}</h3>
        </div>
      </div>
    </div>
  )
}

export default Student