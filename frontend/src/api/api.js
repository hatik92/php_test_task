import axios from 'axios'

const apiConfig = axios.create({
  baseURL: 'http://books-task-api.test/api/'
})

export const books = {
  getAllBooks() {
    return apiConfig.get('books').then(res => res.data)
  },
  getBookById(id) {
    return apiConfig.get('books/' + id).then(res => res.data)
  },
  getSearchBook(val) {
    return apiConfig.get('books/?search=' + val).then(res => res.data)
  }
}

export const students = {
  getAllStudents(bookId = null) {
    return apiConfig.get('students/?bookId=' + bookId).then(res => res.data)
  }
}
