import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books, students } from "../../api/api";
// import { Categoty } from "../Sidebar/SidebarSlice";


const initialState = {
  book: {
    id: null,
    title: "",
    author: "",
    year: "",
    count: null,
    available: null,
    students: [],
    created_at: "",
    updated_at: "",
  },
  assignStudents: [],
  loading: 'idle',
  currentRequestId: undefined,
}

export const getBook = createAsyncThunk(
  'book/bookStatus',
  async (id) => {
    return await books.getBookById(id).then(res => res.data)
  }
)

export const getAssignStudents = createAsyncThunk(
  'book/getAssignStudents',
  async (bookId) => {
    return await students.getAllStudents(bookId).then(res => res.data)
  }
)

export const addBookToStudent = createAsyncThunk(
  'book/addBookToStudent',
  async (payload) => {
    return await books.addBookToStudent(payload.book_id, payload.student_id)
  }
)

console.log(addBookToStudent());


export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getBook.pending, (state) => {
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.book = action.payload
      })
      .addCase(getAssignStudents.pending, (state) => {
        // state.initialized = false
      })
      .addCase(getAssignStudents.fulfilled, (state, action) => {
        state.assignStudents = action.payload
        // state.initialized = true
      })
      .addCase(addBookToStudent.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
          state.currentRequestId = action.meta.requestId
          // state.initialized = false
        }
      })
      .addCase(addBookToStudent.fulfilled, (state, action) => {
        const { requestId } = action.meta
        debugger
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle'
          const student = state.assignStudents.find(st => st.id === action.payload.student_id)
          state.book.students.push(student)
          state.assignStudents = state.assignStudents.filter(student => student.id !== action.payload.student_id)
          // state.initialized = true
          // state.entities.push(action.payload)
          state.currentRequestId = undefined
        }
      })
      .addCase(addBookToStudent.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          console.log(action);
          state.loading = 'idle'
          state.error = action.error
          state.currentRequestId = undefined
        }
      })
  }
})


export default bookSlice.reducer