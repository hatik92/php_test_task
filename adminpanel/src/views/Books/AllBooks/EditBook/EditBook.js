import { CButton, CForm, CFormInput, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import AddOrEditBookForm from '../../AddOrEditBookForm/AddOrEditBookForm'
import { updateBook } from '../allBooksSlice'
import { editBook } from './editBookSlice'

const EditBook = ({ visible, setVisible, book }) => {
  const dispatch = useDispatch()
  const [bookData, setbookData] = useState({title: book.title, author: book.author, year: book.year, count: book.count});
  
  const cancelClick = () => setVisible(false)
  const handlerSubmit = (e) => {
    e.preventDefault()
    dispatch(editBook({bookId: book.id, bookData}))
    dispatch(updateBook({bookId: book.id, bookData}))
    setVisible(false)
    console.log(bookData);
  }
  return <>
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Edit book {book.id}</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <AddOrEditBookForm cancelClick={cancelClick} handlerSubmit={handlerSubmit} setbookData={setbookData} bookData={bookData} />
        {/* <CForm
        // onSubmit={handlerSubmit}
        >
          <div className="mb-3">
            <CFormLabel htmlFor="book_title">Book title</CFormLabel>
            <CFormInput
              type="text"
              id="book_title"
              name="title"
            // value={bookTitle}
            // onChange={e => setbookTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="book_author">Book author</CFormLabel>
            <CFormInput
              type="text"
              id="book_author"
              name="author"
            // value={bookAuthor}
            // onChange={e => setbookAuthor(e.target.value)}
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
            // value={bookYear}
            // onChange={e => setbookYear(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="book_count">Book count</CFormLabel>
            <CFormInput
              type="number"
              id="book_count"
              name="count"
            // value={bookCount}
            // onChange={e => setbookCount(e.target.value)}
            />
          </div>
          <div className="col-auto d-flex justify-content-end">
            <CButton
              className="m-1"
              color="secondary"
              onClick={() => setVisible(false)}
            >
              Cancel
            </CButton>
            <CButton color="success" type="submit" className="m-1">
              Save
            </CButton>
          </div>
        </CForm> */}
      </CModalBody>
    </CModal>
  </>
}

export default EditBook