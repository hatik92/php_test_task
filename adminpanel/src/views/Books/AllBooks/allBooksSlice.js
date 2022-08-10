import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books } from "src/api/api";


const initialState = {
  initialized: false,
  meta: {},
  books: []
}

export const allBooks = createAsyncThunk(
  'allBooks/allBooks',
  async (payload, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await books.getAllBooks(payload?.current_page)
      if (response.statusText !== 'OK') throw new Error(response.response.data.error)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const deleteBook = createAsyncThunk(
  'allBooks/deleteBook',
  async (payload, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await books.deleteBook(payload?.bookId)
      if (!response.data.success) throw new Error(response.response.data.error)
      dispatch(removeBook(payload?.bookId))
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const allBooksSlice = createSlice({
  name: 'allBooks',
  initialState,
  reducers: {
    updateBook(state, action) {
      state.books = state.books.map(book => book.id === action.payload.bookId
        ? {
          ...book,
          title:  action.payload.bookData.title,
          author: action.payload.bookData.author,
          year:   action.payload.bookData.year,
          count:  action.payload.bookData.count,
        }
        : book)
    },
    removeBook(state, action) {
      debugger
      state.books = state.books.filter(book => book.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(allBooks.pending, (state) => {
        state.initialized = false
      })
      .addCase(allBooks.fulfilled, (state, action) => {
        state.books = action.payload.data
        state.meta = action.payload.meta
        // state.links = action.payload.links
        // state.initialized = true
      })
      .addCase(allBooks.rejected, (state, action) => {
        // state.error = action.payload
      })
  },
})



export const { updateBook, removeBook } = allBooksSlice.actions
export default allBooksSlice.reducer