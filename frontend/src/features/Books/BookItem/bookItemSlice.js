import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books } from "../../../api/api";

const initialState = {
  books: [],
  initialized: false
}

export const getBooks = createAsyncThunk(
  'book/bookStatus',
  async () => {
    return await books.getAllBooks()
  }
)

export const gallerySlice = createSlice({
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


export default gallerySlice.reducer