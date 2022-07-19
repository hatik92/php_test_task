import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books } from "../../api/api";
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
  }
}

export const getBook = createAsyncThunk(
  'book/bookStatus',
  async (id) => {
    return await books.getBookById(id).then(res => res.data)
  }
)


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
  }
})


export default bookSlice.reducer