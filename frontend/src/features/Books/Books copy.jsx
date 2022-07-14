import { FC, useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getBooks } from './booksSlice'
// import styles from './books.module.sass'
// import Loading from '../common/loading/loading'

const Books = () => {
  
  // const categoryParams = useParams
  const allBooks = useSelector(store => store.books.books)
  console.log(allBooks);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBooks())
  }, []);
  
  return <>
    <div>
      <div>
        {allBooks.map((book,i) => 
        // <div key={i} className={styles.inner}>
          <h1 key={i}>{book.title}</h1>
        // </div>
        )}
      </div>
    </div>
  </>
}

export default Books