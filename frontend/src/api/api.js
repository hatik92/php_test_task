import axios from 'axios'

const apiConfig = axios.create({
  baseURL: 'http://books-task-api.test/api/',
  // withCredentials: true,
})

export const books = {
  getAllBooks() {
    return apiConfig.get('books').then(res => res.data)
  },
  getBookById(id) {
    return apiConfig.get('books/' + id).then(res => res.data)
  },
  addBookToStudent(book_id, student_id) {
    return apiConfig.post('books', {book_id, student_id})
    .then(res => res.data)
    .catch(err => err)
  },
}

export const students = {
  getAllStudents(bookId = null) {
    return apiConfig.get('students', {params:{bookId}}).then(res => res.data)
  }
}
