import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Search from '../Search/Search'
import BookItem from './BookItem/BookItem'
import {
  getBooks,
} from './booksSlice'

const Books = () => {

  const allBooks = useSelector(store => store.books.books)
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const filterBooks = allBooks.filter(book => {
    return (book.title.toLowerCase().includes(searchValue.toLowerCase()) || book.author.toLowerCase().includes(searchValue.toLowerCase()))
  })

  return <>
    <div>
      <Search
        value={searchValue}
        setValue={setSearchValue}
      />
      <div className='px-2 w-75'>
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