import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books } from "../../../api/api";
// import { Categoty } from "../Sidebar/SidebarSlice";


const initialState = {
  books: [],
  initialized: false
}

export const getSearchBook = createAsyncThunk(
  'books/status',
  async (val) => {
    return await books.getSearchBook(val)
  }
)


export const searchBook = createSlice({
  name: 'books',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchBook.pending, (state) => {
        state.initialized = false
      })
      .addCase(getSearchBook.fulfilled, (state, action) => {
        console.log(action.payload);
        state.books = action.payload
        state.initialized = true
      })
  }
})


export default searchBook.reducer