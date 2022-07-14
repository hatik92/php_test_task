import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books } from "../../api/api";
// import { Categoty } from "../Sidebar/SidebarSlice";


const initialState = {
  books: [],
  searchResult: [],
  initialized: false
}

export const getBooks = createAsyncThunk(
  'books/status',
  async () => {
    return await books.getAllBooks()
  }
)


export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    searchBook:(state,action) => {
      // debugger
      console.log(action);
      if (action.payload !== '') {
        state.searchResult = state.books.filter(book => book.title.indexOf(action.payload) > -1 || book.author.indexOf(action.payload) > -1 )
      }
      else {
        state.searchResult = []
      }
    }
  },
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

export const { searchBook } = booksSlice.actions;
export default booksSlice.reducer