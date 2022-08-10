import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CToast, CAlert } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle } from '@coreui/icons';

const DeleteModal = ({ visible, setVisible, deleteBookHandler, id, addToast }) => {
  const onDelete = (id) => {
    deleteBookHandler(id)
    setVisible(false)
    addToast(exampleToast)
  }
  const exampleToast = (
    <CToast>
      <CAlert color="success" className="mb-0 d-flex align-items-center">
        <CIcon icon={cilCheckCircle} className="flex-shrink-0 me-2" width={24} height={24} />
        <div>
          Book deleted successfully!
        </div>
      </CAlert>
    </CToast>
  )
  return <>
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>Delete book</CModalTitle>
      </CModalHeader>
      <CModalBody>Are you sure you want to delete this book?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>No</CButton>
        <CButton color="danger" onClick={() => onDelete(id)}>Yes</CButton>
        {/* <CButton onClick={() => addToast(exampleToast)}>Send a toast</CButton> */}
      </CModalFooter>
    </CModal>
  </>
}

export default DeleteModal