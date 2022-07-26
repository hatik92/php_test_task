import axios from 'axios'
const baseURL = process.env.REACT_APP_API_URL
const apiConfig = axios.create({
  // baseURL: 'http://localhost:8000/api/'
  baseURL: baseURL,
  // withCredentials: true,
})
export const books = {
  getAllBooks(current_page = 1) {
    return apiConfig.get('books?page=' + current_page).then(res => res.data)
  },
  getBookById(id) {
    return apiConfig.get('books/' + id).then(res => res.data)
  },
  addBookToStudent(book_id, student_id) {
    return apiConfig.post('books', {book_id, student_id})
    .then(res => res.data)
    .catch(err => err)
  },
  removeBookToStudent(book_id, student_id) {
    return apiConfig.post('books/detach', {book_id, student_id})
    .then(res => res.data)
    .catch(err => err)
  },
}

export const students = {
  getAllStudents(bookId = null) {
    return apiConfig.get('students', {params:{bookId}}).then(res => res.data)
  }
}
