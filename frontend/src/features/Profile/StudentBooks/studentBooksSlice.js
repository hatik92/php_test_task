import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books } from "../../../api/api";

const initialState = {
  books: [],
  meta: null,
  links: [],
  initialized: false,
  assignBook: true,
  error: null
}

export const getBooks = createAsyncThunk(
  'books/getBooks',
  async (payload,{rejectWithValue, dispatch, getState}) => {
    try {
      const response = await books.getAllBooks(payload?.current_page, payload?.search)
      if (response.statusText !== 'OK') throw new Error(response.response.data.error)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
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
        state.books = action.payload.data
        state.meta = action.payload.meta
        state.links = action.payload.links
        state.initialized = true
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.error = action.payload
      })
  }
})

export default booksSlice.reducer