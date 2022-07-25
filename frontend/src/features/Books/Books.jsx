import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import BookItem from './BookItem/BookItem'
import {
  getBooks,
} from './booksSlice'

const Books = () => {
  let searchParams = useSearchParams()[0];

  const allBooks = useSelector(store => store.books.books)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getBooks());
  // }, [dispatch]);

  const searchValue = searchParams.get("search")? searchParams.get("search"): ''
  const filterBooks = allBooks.filter(book => {
    return (book.title.toLowerCase().includes(searchValue.toLowerCase()) || book.author.toLowerCase().includes(searchValue.toLowerCase()))
  })

  return <>
    <div className='container shadow p-3 mb-5 bg-white rounded'>
      <div className='px-2'>
        <ul>
          {filterBooks.length ?
            filterBooks.map((book) =>
              <BookItem key={book.id} book={book} />
            ) :
            <h1>not found</h1>
          }
        </ul>
      </div>
    </div>
  </>
}

export default Books