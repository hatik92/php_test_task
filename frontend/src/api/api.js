import axios from 'axios'
const baseURL = process.env.REACT_APP_API_URL
export const apiConfig = axios.create({
  baseURL: baseURL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  // withCredentials: true,
})
export const books = {
  getAllBooks(current_page = 1, search = '') {
    return apiConfig.get('api/books?page=' + current_page + '&search=' + search).then(res => res.data)
  },
  getBookById(id) {
    return apiConfig.get('api/books/' + id).then(res => res.data)
  },
  addBookToStudent(book_id, student_id) {
    return apiConfig.post('api/books', {book_id, student_id})
    .then(res => res.data)
    .catch(err => err)
  },
  removeBookToStudent(book_id, student_id) {
    return apiConfig.post('api/books/detach', {book_id, student_id})
    .then(res => res.data)
    .catch(err => err)
  },
}

export const students = {
  getAllStudents(bookId = null) {
    return apiConfig.get('api/students', {params:{bookId}}).then(res => res.data)
  }
}
