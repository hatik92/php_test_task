import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books } from "src/api/api";


const initialState = {
  initialized: false,
}

export const addBook = createAsyncThunk(
  'addBook/addBook',
  async (payload,{rejectWithValue, dispatch, getState}) => {
    try {
      const response = await books.addBook(payload)
      if (response.statusText !== 'OK') throw new Error(response.response.data.error)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.initialized = false
      })
      .addCase(addBook.fulfilled, (state, action) => {
        // state.books = action.payload.data
        // state.meta = action.payload.meta
        // state.links = action.payload.links
        // state.initialized = true
      })
      .addCase(addBook.rejected, (state, action) => {
        // state.error = action.payload
      })
  },
})




export default loginSlice.reducer