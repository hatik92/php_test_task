import { useDispatch, useSelector } from 'react-redux'
import BootstrapPagination from '../../Common/Pagination/Pagination'
import BookItem from './BookItem/BookItem'
import { getBooks } from './booksSlice';
import { useParams } from 'react-router-dom';
import Skeleton from './../../Common/Skeleton/Skeleton';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import BookLoader from '../../Common/Loader/BookLoader';

const Books = () => {
  const { page } = useParams();
  const { initialized, books: allBooks, meta, links } = useSelector(store => store.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let searchParams = useSearchParams()[0];
  let searchValue = searchParams.get('search');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue) {
        searchValue = searchValue.replace(/\s+/g, ' ').trim();
        dispatch(getBooks({ current_page: 1, search: searchValue }));
        navigate("../books/1" + location.search, { replace: true });
      }
    }, 1500)
    if (!searchValue) {
        dispatch(getBooks({ current_page: page }));
    }
    return () => clearTimeout(delayDebounceFn)
  }, [dispatch, searchValue]);
  
  return <>
    <div className='container shadow p-3 mb-3 rounded'>
      {initialized
        ? allBooks.length
          ? <>
            <div className='px-2 row row-cols-5'>
              {allBooks.map((book) =>
                <BookItem key={book.id} book={book} />)}
            </div>
          <div className='d-flex justify-content-center'>
            <BootstrapPagination pagination={meta} links={links} getData={getBooks} current_page={page} />
          </div>
          </>
          : <h3 className='text-center'>Uh Oh! Book not found!</h3>
        : <BookLoader />}
    </div>
  </>
}

export default Books