import React, { useState } from 'react'
import { CTableRow, CTableHeaderCell, CTableDataCell, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';
import EditBook from '../EditBook/EditBook';

const BookItem = ({book, index}) => {

  const [visible, setVisible] = useState(false)


  return <>
    <CTableRow className="align-middle">
      <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
      <CTableDataCell>{book.title}</CTableDataCell>
      <CTableDataCell>{book.author}</CTableDataCell>
      <CTableDataCell>{book.year}</CTableDataCell>
      <CTableDataCell>{book.count}</CTableDataCell>
      <CTableDataCell>
        <CButton onClick={() => setVisible(!visible)} shape="rounded-pill" title='Edit'>
          <CIcon icon={cilPencil} size="xl"/>
        </CButton>
      </CTableDataCell>
      <CTableDataCell>
        <CButton color="danger" shape="rounded-pill" title='Delete'>
          <CIcon icon={cilTrash} size="xl"/>
        </CButton>
      </CTableDataCell>
    </CTableRow>
    <EditBook visible={visible} setVisible={setVisible} book={book} />
  </>
}

export default BookItem