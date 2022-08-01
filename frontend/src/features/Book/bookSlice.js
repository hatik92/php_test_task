import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books, students } from "../../api/api";
import { formatDate } from "../../helpers/helpers";

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
  loading: false,
  assignedProcess: [],
  removeProcess: [],
  assignedProcessStop: false,
  currentRequestId: undefined,
}

export const getBook = createAsyncThunk(
  'book/getBook',
  async (id) => {
    return await books.getBookById(id)
  }
)

export const getAssignStudents = createAsyncThunk(
  'book/getAssignStudents',
  async (bookId) => {
    return await students.getAllStudents(bookId)
  }
)

export const addBookToStudent = createAsyncThunk(
  'book/addBookToStudent',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await books.addBookToStudent(payload.book_id, payload.student_id)
      if (!response.success) throw new Error(response.response.data.error)
      dispatch(booksLeft())
      return response.data.request
    } catch (error) {
      return rejectWithValue(error)
    }

  }
)

export const removeBookToStudent = createAsyncThunk(
  'book/removeBookToStudent',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await books.removeBookToStudent(payload.book_id, payload.student_id)
      if (!response.success) throw new Error(response.response.data.error)
      dispatch(remobeBookToStudent(payload.student_id))
      return response.data.request
    } catch (error) {
      return rejectWithValue(error)
    }

  }
)



export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    booksLeft(state) {
      if (state.book.count - state.book.available !== 1) {
        state.book.available++
        state.assignedProcessStop = false
        return
      }
      state.assignedProcessStop = true
      state.book.available++
    },
    remobeBookToStudent(state, action) {
      console.log(action);
      state.assignedProcessStop = false
      state.book.students = state.book.students.filter(st => st.id !== action.payload)
      state.book.available--
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBook.fulfilled, (state, action) => {
        state.book = action.payload
        state.book.available = state.book.students.length
        if (state.book.count === state.book.available) state.assignedProcessStop = true

      })
      .addCase(getAssignStudents.fulfilled, (state, action) => {
        const students = action.payload.map(st => { return { ...st, loading: false } })
        state.assignStudents = students
      })
      .addCase(addBookToStudent.pending, (state, action) => {
        state.assignedProcessStop = true
        state.assignedProcess.push(action.meta.arg?.student_id)
      })
      .addCase(addBookToStudent.fulfilled, (state, action) => {
        const student = state.assignStudents.find(st => st.id === action.meta.arg?.student_id)
        student.return_date = formatDate(10)
        state.assignedProcess = state.assignedProcess.filter(st => st !== action.meta.arg?.student_id)
        state.book.students.push(student)
        state.assignedProcess.filter(st => st !== student?.id)
        state.assignStudents = state.assignStudents.filter(student => student.id !== action.meta.arg?.student_id)
      })
      .addCase(addBookToStudent.rejected, (state, action) => {
        state.error = action.payload.message
      })
      .addCase(removeBookToStudent.pending, (state, action) => {
        state.removeProcess.push(action.meta.arg?.student_id)
      })
      .addCase(removeBookToStudent.fulfilled, (state, action) => {
        const studentId = action.meta.arg?.student_id
        state.removeProcess = state.removeProcess.filter(st => st !== studentId)
      })
      .addCase(removeBookToStudent.rejected, (state, action) => {
        state.error = action.payload.message
      })
  }
})

export const { booksLeft, remobeBookToStudent } = bookSlice.actions

export default bookSlice.reducer