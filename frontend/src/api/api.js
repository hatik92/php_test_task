import axios from 'axios'

const booksApi = axios.create({
  baseURL: 'http://books-task-api.test/'
})

export const books = {
  getAllBooks() {
    return booksApi.get('books').then(res => res.data)
  },
  getBookById(id) {
    return booksApi.get('books/' + id).then(res => res.data)
  },
  getSearchBook(val) {
    return booksApi.get('books/?search=' + val).then(res => res.data)
  }
}
