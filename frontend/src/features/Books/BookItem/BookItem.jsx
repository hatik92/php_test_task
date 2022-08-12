
import { Link } from 'react-router-dom';
import style from './bookItem.module.css'
import bookImg from '../../../images/book.jpg';

const BookItem = ({ book }) => {
  const title = (title) => {
    if (title.length > 20) {
      return title.slice(0, 20).concat('...')
    }
    return title
  }
  return <>
    <div className={'col mb-4 ' + style.bookItem}>
      <div className={'shadow-none p-3 rounded ' + style.bookBlock}>
        <div className="">
          {book.return_date && <>
            <p>Return date</p>
            <p>{book.return_date}</p>
          </>}
          <div className="">
            <Link className={style.bookLink} to={'/book/' + book.id} title={book.title} >
              <img src={book.img ? book.img : bookImg} className="img-fluid rounded" alt="..." />
            </Link>
          </div>
          <div className="">
            <div className="mt-2">
              <p className="fw-bold text-center">
                <Link className={style.bookLink} to={'/book/' + book.id} title={book.title} >{title(book.title)}</Link>
              </p>
              {/* <p className="">Author: {book.author}</p>
              <p className=""><small className="text-muted">Count: {book.count}</small></p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default BookItem