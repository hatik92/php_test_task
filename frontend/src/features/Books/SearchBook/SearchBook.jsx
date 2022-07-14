import React from 'react'
import { useState } from 'react';
import { getSearchBook } from './searchBookSlice';
import { useSelector, useDispatch } from 'react-redux';

const SearchBook = ({searchBookByVal}) => {
  const searchBook = useSelector(store => store.books.books)
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch()
  // useEffect(() => {
  const search = (val) => {
    setSearchValue(val)
  }
  const hendlerSearch = () => {
    
    console.log(searchValue);
    dispatch(searchBookByVal(searchValue))
  }
  // }, []);
  return <>
    <input onChange={e => search(e.target.value)} value={searchValue} />
    <button onClick={hendlerSearch}>Search</button>
  </>
}

export default SearchBook