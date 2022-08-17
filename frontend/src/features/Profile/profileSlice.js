import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { students } from "../../api/api";
import { profile } from './../../api/api';

const initialState = {
  profile: {
    id:       null,
    email:    "",
    username: "",
    name:     "",
    surname:  "",
    facultet: "",
    image:    "",
  },
  initializad: false,
}

export const getProfile = createAsyncThunk(
  'profile/getStudent',
  async (peyload,{rejectWithValue, dispatch, getState}) => {
    try {
      const response = await profile.getProfile()
      debugger
      // if (response.statusText !== 'OK') throw new Error(response.response.data.error)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.initialized = false
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload.data
        state.initialized = true
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.error = action.payload
        state.initialized = true
      })
  }
})

export default profileSlice.reducer