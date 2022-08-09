import axios from 'axios'
// import { logout } from '../helpers/helpers'
const baseURL = process.env.REACT_APP_API_URL
const apiConfig = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

apiConfig.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.log('?', error);
    }
    if (error.response.status === 401 || error.response.status === 419) {
      // logout()
      return
    }
    if (error.response.status === 404) {
      return
    }
    console.log(error);
    return error;
  });

export const books = {
  getAllBooks(current_page = 1, search = '') {
    return apiConfig.get('/api/books?page=' + current_page + '&search=' + search)
      .then(res => res)
  },
  getBookById(id) {
    return apiConfig.get('/api/books/' + id)
      .then(res => res.data)
  },
  addBook(bookData) {
    return apiConfig.post('/api/books', bookData)
      .then(res => res.data)
  },
  updateBook(id, bookData) {
    return apiConfig.put('/api/books/' + id, bookData)
      .then(res => res.data)
  },
  removeBook(bookId) {
    return apiConfig.delete('/api/books/' + bookId)
      .then(res => res.data)
  },
}

export const students = {
  getAllStudents(bookId = null) {
    return apiConfig.get('/api/students', { params: { bookId } })
      .then(res => res.data)
  },
  getStudentById(id) {
    return apiConfig.get('/api/students/' + id)
      .then(res => res.data)
  }
}
