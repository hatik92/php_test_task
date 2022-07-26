import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import NotFound from '../../404notFound/NotFound'
import BootstrapPagination from '../../Pagination/Pagination'
import BookItem from './BookItem/BookItem'
import { getBooks } from './booksSlice';
import { useParams } from 'react-router-dom';

const Books = () => {
  let searchParams = useSearchParams()[0];
  const { page } = useParams();
  const { books: allBooks, meta, links } = useSelector(store => store.books)

  const searchValue = searchParams.get("search") ? searchParams.get("search") : ''
  const filterBooks = allBooks.filter(book => {
    return (book.title.toLowerCase().includes(searchValue.toLowerCase()) || book.author.toLowerCase().includes(searchValue.toLowerCase()))
  })

  return <>
    {filterBooks.length ?
      (<div className='container shadow p-3 mb-5 bg-white rounded'>
        <div className='px-2'>
          {filterBooks.map((book) =>
            <BookItem key={book.id} book={book} />)}
        </div>
        <BootstrapPagination pagination={meta} links={links} getData={getBooks} current_page={page} />
      </div>)
      : <NotFound param='Book' />}
  </>
}

export default Books