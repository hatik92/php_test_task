import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookItem from '../../Books/BookItem/BookItem';
import { getWishList } from './wishListSlice';
import BootstrapPagination from './../../../Common/Pagination/Pagination';
import style from './wishList.module.css';
import BookLoader from './../../../Common/Loader/BookLoader';

const WishList = () => {
  const { wishList, initialized } = useSelector(store => store.wishList)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getWishList())
  }, [dispatch]);
  return <>
    <h1 className='bg-light text-center'>Wish list</h1>
    <div className='container shadow p-3 mb-3 rounded'>
      {initialized
        ? wishList.length
          ? <>
            <div className={'px-2 row row-cols-5 ' + style.booksBlock}>
              {wishList.map((book) =>
                <BookItem key={book.id} book={book} />)}
            </div>
            <div className='d-flex justify-content-center'>
              {/* <BootstrapPagination pagination={meta} links={links} getData={getBooks} current_page={page} path='/books/' /> */}
            </div>
          </>
          : <h3 className='text-center'>Uh Oh! Book not found!</h3>
        : <BookLoader />}
    </div>
  </>
}

export default WishList