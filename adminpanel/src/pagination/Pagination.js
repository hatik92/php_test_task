import { CPagination, CPaginationItem } from '@coreui/react';
import React from 'react'
import { useDispatch } from 'react-redux';
import style from './pagitation.module.css'

const Pagination = ({ pagination, getData, current_page = 1 }) => {
  const dispatch = useDispatch();

  let items = [];

  for (let i = 1; i < pagination?.links?.length - 1; i++) {
    if (pagination.links[i].label === '...') {
      items.push(
        <li key={i} className="page-item">
          <button disabled className='page-link'>{pagination.links[i].label}</button>
        </li>
      );
    } else {
      items.push(
        <CPaginationItem key={i}
          active={pagination.links[i].active}
          className={style.pageLink}
          onClick={() => changePageHandler(pagination.links[i].label)}
        >
          {pagination.links[i].label}
        </CPaginationItem>
      );
    }
  }


  const changePageHandler = (currentPage) => {
    const payload = { current_page: currentPage }
    dispatch(getData(payload))
  }

  return <>
    <CPagination aria-label="Page navigation example">{items}</CPagination>
  </>
}

export default Pagination