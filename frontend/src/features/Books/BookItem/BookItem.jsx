
import { Link } from 'react-router-dom';

const BookItem = ({ book }) => {
  console.log(book.id);
  return <>
    <li>
      <Link to={'book/'+book.id} >{book.title}</Link>
    </li>
  </>
}

export default BookItem