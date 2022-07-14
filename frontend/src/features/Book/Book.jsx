import React from 'react'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getBook } from './bookSlice';

const Book = () => {
  const book = useSelector(store => store.book)
  const dispatch = useDispatch()
  console.log(book);
  useEffect(() => {
    dispatch(getBook(21))
  }, []);
  return (
    <div>Book</div>
  )
}

export default Book