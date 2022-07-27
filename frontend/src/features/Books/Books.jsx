import { useSelector } from 'react-redux'
import BootstrapPagination from '../../Common/Pagination/Pagination'
import BookItem from './BookItem/BookItem'
import { getBooks } from './booksSlice';
import { useParams } from 'react-router-dom';
import Skeleton from './../../Common/Skeleton/Skeleton';

const Books = () => {
  const { page } = useParams();
  const { initialized, books: allBooks, meta, links } = useSelector(store => store.books)
  // const filterBooks = allBooks.filter(book => {
  //   return (book.title.toLowerCase().includes(searchValue.toLowerCase()) || book.author.toLowerCase().includes(searchValue.toLowerCase()))
  // })
  
  return <>

    <div className='container shadow p-3 mb-3 bg-white rounded'>
      {initialized
        ? allBooks.length
          ? <>
            <div className='px-2'>
              {allBooks.map((book) =>
                <BookItem key={book.id} book={book} />)}
            </div>
          <div className='d-flex justify-content-center'>
            <BootstrapPagination pagination={meta} links={links} getData={getBooks} current_page={page} />
          </div>
          </>
          : <h3>Uh Oh! Book not found!</h3>
        : <Skeleton />}
    </div>
  </>
}

export default Books