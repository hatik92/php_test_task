import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books, students } from "../../api/api";


const initialState = {
  books: [],
  assignStudent: '',
  assignStudents: [],
  initialized: false,
  assignBook: true
}

export const getBooks = createAsyncThunk(
  'books/getBooks',
  async () => {
    return await books.getAllBooks().then(res => res.data)
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
        state.books = action.payload
        state.initialized = true
      })
      // .addCase(getAssignStudents.pending, (state) => {
      //   state.initialized = false
      // })
      // .addCase(getAssignStudents.fulfilled, (state, action) => {
      //   state.assignStudents = action.payload
      //   state.initialized = true
      // })
      // .addCase(addBookToStudent.pending, (state) => {
      //   state.initialized = false
      // })
      // .addCase(addBookToStudent.fulfilled, (state, action) => {
      //   // debugger
      //   const student = state.assignStudents.find(st => st.id === action.payload.student_id)
      //   const book = state.books.find(book => book.id === action.payload.book_id)
      //   book.students.push(student)
      //   // console.log(state);
      //   // state.books.find(book => book.id === action.payload.book_id).push(student)
      //   // state.assignStudent = state.assignStudents.find(st => st.id === action.payload.student_id)
      //   state.assignStudents = state.assignStudents.filter(student => student.id !== action.payload.student_id)
      //   state.initialized = true
      // })
  }
})

export default booksSlice.reducer