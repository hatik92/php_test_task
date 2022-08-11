import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { books, students } from "../../api/api";
// import { Categoty } from "../Sidebar/SidebarSlice";


const initialState = {
  student: {},
  loading: true
}

export const getStudent = createAsyncThunk(
  'student/getStudent',
  async (id,{rejectWithValue}) => {
    // return await books.getStudentById(id).then(res => res.data)
    try {
      const response = await students.getStudentById(id)
      if (response.statusText !== "OK") throw new Error(response.response.data.error)
      // dispatch(remobeBookToStudent(payload.student_id))
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
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
        // state.loading = true
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.student = action.payload
        state.loading = false
      })
  }
})


export default studentSlice.reducer