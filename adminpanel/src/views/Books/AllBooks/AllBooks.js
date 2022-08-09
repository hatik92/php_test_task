import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import BookItem from './BookItem/BookItem'
import { useDispatch, useSelector } from 'react-redux';
import { allBooks } from './allBooksSlice';
import Pagination from 'src/pagination/Pagination';

const Allbooks = () => {
  const dispatch = useDispatch()
  const { books, meta } = useSelector(store => store.allBooks)
  const [page, setpage] = useState(1);

  useEffect(() => {
    dispatch(allBooks({ current_page: page }));
  }, [dispatch]);

  return <>
    <div style={{ height: '40em' }}>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Author</CTableHeaderCell>
            <CTableHeaderCell scope="col">Year</CTableHeaderCell>
            <CTableHeaderCell scope="col">Count</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {books.map((book, index) => <BookItem book={book} key={index} index={index + 1} />)}
        </CTableBody>
      </CTable>
    </div>
    <div className='d-flex justify-content-center'>
      <Pagination pagination={meta} getData={allBooks} current_page={page} />
    </div>
  </>
}

export default Allbooks