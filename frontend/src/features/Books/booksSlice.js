import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books } from "../../api/api";


const initialState = {
  books: [],
  meta: null,
  links: [],
  initialized: false,
  assignBook: true
}

export const getBooks = createAsyncThunk(
  'books/getBooks',
  async (payload) => {
    return await books.getAllBooks(payload.current_page)
  }
)

// export const getAssignStudents = createAsyncThunk(
//   'books/getAssignStudents',
//   async (bookId) => {
//     return await students.getAllStudents(bookId).then(res => res.data)
//   }
// )

// export const addBookToStudent = createAsyncThunk(
//   'books/addBookToStudent',
//   async (payload) => {
//     return await books.addBookToStudent(payload.book_id, payload.student_id)
//   }
// )


export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.initialized = false
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.books = action.payload.data
        state.meta = action.payload.meta
        state.links = action.payload.links
        state.initialized = true
      })
  }
})

export default booksSlice.reducer