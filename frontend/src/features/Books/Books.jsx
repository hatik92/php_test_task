import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BookItem from './BookItem/BookItem'
import { getBooks, searchBook } from './booksSlice'
import SearchBook from './SearchBook/SearchBook'

const Books = () => {

  // const categoryParams = useParams
  const allBooks = useSelector(store => store.books.books)
  const searchResult = useSelector(store => store.books.searchResult)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBooks())
  }, []);
  // const searchBookByVal = () => {
  //   searchBook
  // }
  console.log(allBooks);
  return <>
    <div>
      <SearchBook searchBookByVal={searchBook} />
      <div>
        {searchResult.length > 0 ?
          searchResult.map((book, i) =>
            <BookItem key={i} title={book.title} />
          )
          :
          allBooks.map((book, i) =>
            <BookItem key={i} title={book.title} />
          )
        }
      </div>
    </div>
  </>
}

export default Books