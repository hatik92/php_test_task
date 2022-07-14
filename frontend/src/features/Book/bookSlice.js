import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books } from "../../api/api";
// import { Categoty } from "../Sidebar/SidebarSlice";


const initialState = {
  id: null,
  title: "",
  author: "",
  year: "",
  count: null,
  available: null,
  created_at: "",
  updated_at: "",
}

export const getBook = createAsyncThunk(
  'book/status',
  async (id) => {
    return await books.getBookById(id)
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
        console.log(action.payload);
        state = action.payload
      })
  }
})


export default bookSlice.reducer