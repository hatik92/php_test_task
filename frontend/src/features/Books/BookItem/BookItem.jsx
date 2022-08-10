
import { Link } from 'react-router-dom';
import styles from './bookItem.module.css'
import bookImg from '../../../images/book.jpg';

const BookItem = ({ book }) => {
  const title = (title) => {
    if (title.length > 25) {
      return title.slice(0, 25).concat('...')
    }
    return title
  }
  return <>
    <div className='col mb-4'>
      <div className={'shadow-none p-3 rounded ' + styles.bookBlock}>
        <div className="">
          <div className="">
            <Link className={styles.bookLink} to={'/book/' + book.id} title={book.title} >
              <img src={book.img ? book.img : bookImg} className="img-fluid rounded" alt="..." />
            </Link>
          </div>
          <div className="">
            <div className="mt-2">
              <p className="fw-bold text-center">
                <Link className={styles.bookLink} to={'/book/' + book.id} title={book.title} >{title(book.title)}</Link>
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