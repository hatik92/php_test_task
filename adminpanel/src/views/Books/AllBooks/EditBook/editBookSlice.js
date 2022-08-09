import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books } from "src/api/api";


const initialState = {
  initialized: false,
  // meta: {},
  // books: []
}

export const editBook = createAsyncThunk(
  'editBook/editBook',
  async (payload,{rejectWithValue, dispatch, getState}) => {
    try {
      const response = await books.updateBook(payload.bookId, payload?.bookData)
      if (!response.data.success) throw new Error(response.response.data.error)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const editBookSlice = createSlice({
  name: 'editBook',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(editBook.pending, (state) => {
        state.initialized = false
      })
      .addCase(editBook.fulfilled, (state, action) => {
        // state.books = action.payload.data
        // state.meta = action.payload.meta
        // state.links = action.payload.links
        // state.initialized = true
      })
      .addCase(editBook.rejected, (state, action) => {
        // state.error = action.payload
      })
  },
})




export default editBookSlice.reducer