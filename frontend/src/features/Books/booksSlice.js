import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books } from "../../api/api";


const initialState = {
  books: [],
  initialized: false
}

export const getBooks = createAsyncThunk(
  'books/booksStatus',
  async () => {
    return await books.getAllBooks().then(res => res.data)
  }
)


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
  }
})

export default booksSlice.reducer