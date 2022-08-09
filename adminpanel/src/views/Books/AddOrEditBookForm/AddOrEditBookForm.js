import React from 'react'
import { CButton, CForm, CFormInput, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'


const AddOrEditBookForm = ({cancelClick, handlerSubmit, setbookData, bookData}) => {

  const onHandlerSubmit = (e) => {
    // e.preventDefault()
    handlerSubmit(e)
  }
  return <>
    <CForm
        onSubmit={onHandlerSubmit}
        >
          <div className="mb-3">
            <CFormLabel htmlFor="book_title">Book title</CFormLabel>
            <CFormInput
              type="text"
              id="book_title"
              name="title"
              value={bookData.title}
              onChange={e => setbookData(state => {return{...state, title: e.target.value}})}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="book_author">Book author</CFormLabel>
            <CFormInput
              type="text"
              id="book_author"
              name="author"
              value={bookData.author}
              onChange={e => setbookData(state => {return{...state, author: e.target.value}})}
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
              value={bookData.year}
              onChange={e => setbookData(state => {return{...state, year: e.target.value}})}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="book_count">Book count</CFormLabel>
            <CFormInput
              type="number"
              id="book_count"
              name="count"
              value={bookData.count}
              onChange={e => setbookData(state => {return{...state, count: e.target.value}})}
            />
          </div>
          <div className="col-auto d-flex justify-content-end">
            {cancelClick && <CButton
              className="m-1"
              color="secondary"
              onClick={cancelClick}
            >
              Cancel
            </CButton>}
            <CButton color="success" type="submit" className="m-1">
              Save
            </CButton>
          </div>
        </CForm>
  </>
}

export default AddOrEditBookForm