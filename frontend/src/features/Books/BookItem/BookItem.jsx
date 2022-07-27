
import { Link } from 'react-router-dom';
import styles from './bookItem.module.css'
import bookImg from '../../../images/book.jpg';

const BookItem = ({ book }) => {

  return <>
    <div className="card mb-3 w-100 shadow-none p-3 bg-light rounded">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={bookImg} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title"><Link className={styles.bookLink} to={'/book/' + book.id} >{book.title}</Link></h5>
            <p className="card-text">Author: {book.author}</p>
            <p className="card-text"><small className="text-muted">Count: {book.count}</small></p>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default BookItem