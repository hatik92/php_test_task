import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books } from "../../api/api";
// import { Categoty } from "../Sidebar/SidebarSlice";


const initialState = {
  student: {}
}

export const getStudent = createAsyncThunk(
  'student/studentStatus',
  async (id) => {
    return await books.getStudentById(id).then(res => res.data)
  }
)


export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudent.pending, (state) => {
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.student = action.payload
      })
  }
})


export default studentSlice.reducer