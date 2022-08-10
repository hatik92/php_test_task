import React, { useState } from 'react'
import { CTableRow, CTableHeaderCell, CTableDataCell, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';
import EditBook from '../EditBook/EditBook';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../allBooksSlice';
import DeleteModal from './../../../../components/deleteModal/DeleteModal';

const BookItem = ({ book, index, addToast }) => {

  const [visibleEditModal, setVisibleEditModal] = useState(false)
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false)

  const dispatch = useDispatch()
  const deleteBookHandler = (bookId) => {
    console.log(bookId);
    dispatch(deleteBook({ bookId }))
  }

  return <>
    <CTableRow className="align-middle">
      <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
      <CTableDataCell>{book.title}</CTableDataCell>
      <CTableDataCell>{book.author}</CTableDataCell>
      <CTableDataCell>{book.year}</CTableDataCell>
      <CTableDataCell>{book.count}</CTableDataCell>
      <CTableDataCell>
        <CButton onClick={() => setVisibleEditModal(!visibleEditModal)} shape="rounded-pill" title='Edit'>
          <CIcon icon={cilPencil} size="xl" />
        </CButton>
      </CTableDataCell>
      <CTableDataCell>
        <CButton
          color="danger"
          shape="rounded-pill"
          title='Delete'
          onClick={() => setVisibleDeleteModal(!visibleDeleteModal)}
        >
          <CIcon icon={cilTrash} size="xl" />
        </CButton>
      </CTableDataCell>
    </CTableRow>
    <EditBook visible={visibleEditModal} setVisible={setVisibleEditModal} book={book} />
    <DeleteModal
      visible={visibleDeleteModal}
      setVisible={setVisibleDeleteModal}
      deleteBookHandler={deleteBookHandler}
      id={book.id}
      addToast={addToast}
    />
  </>
}

export default BookItem