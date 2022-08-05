import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addBook } from './addBookSlice';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'

const AddBook = () => {

  const [bookTitle, setbookTitle] = useState('');
  const [bookAuthor, setbookAuthor] = useState('');
  const [bookYear, setbookYear] = useState('');
  const [bookCount, setbookCount] = useState('');
  const dispatch = useDispatch()

  const handlerSubmit = (e) => {
    e.preventDefault()
    const bookData = { title: bookTitle, author: bookAuthor, year: bookYear, count: bookCount }
    console.log(bookData);
    dispatch(addBook(bookData))
    setbookTitle('')
    setbookAuthor('')
    setbookYear('')
    setbookCount('')
  }


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CForm onSubmit={handlerSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="book_title">Book title</CFormLabel>
                <CFormInput
                  type="text"
                  id="book_title"
                  name="title"
                  value={bookTitle}
                  onChange={e => setbookTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="book_author">Book author</CFormLabel>
                <CFormInput
                  type="text"
                  id="book_author"
                  name="author"
                  value={bookAuthor}
                  onChange={e => setbookAuthor(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="book_year">Book year</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="YYYY"
                  min="1700"
                  max="2005"
                  id="book_year"
                  name="year"
                  value={bookYear}
                  onChange={e => setbookYear(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="book_count">Book count</CFormLabel>
                <CFormInput
                  type="number"
                  id="book_count"
                  name="count"
                  value={bookCount}
                  onChange={e => setbookCount(e.target.value)}
                />
              </div>
              <div className="col-auto">
                <CButton type="submit" className="mb-3">
                  Confirm identity
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddBook
