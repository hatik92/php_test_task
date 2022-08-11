import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { students } from "../../api/api";


const initialState = {
  students: [],
  initialized: false
}

export const getStudents = createAsyncThunk(
  'students/getStudents',
  async () => {
    return await students.getAllStudents().then(res => res.data)
  }
)


export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.initialized = false
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.students = action.payload
        state.initialized = true
      })
  }
})

export default studentsSlice.reducer