import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wishList } from "../../../api/api";

const initialState = {
  wishList: [],
  initialized: false,
}

export const getWishList = createAsyncThunk(
  'wishList/getWishList',
  async (payload,{rejectWithValue, dispatch, getState}) => {
    try {
      const response = await wishList.getWishList()
      if (response.statusText !== 'OK') throw new Error(response.response.data.error)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const addToWishList = createAsyncThunk(
  'wishList/addToWishList',
  async (payload,{rejectWithValue, dispatch, getState}) => {
    try {
      const response = await wishList.addToWishList(payload)
      // debugger
      if (response.statusText !== 'OK') throw new Error(response.response.data.error)
      return
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const wishListSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishList.pending, (state) => {
        state.initialized = false
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        // state.profile = action.payload.data
        state.initialized = true
      })
      .addCase(addToWishList.rejected, (state, action) => {
        // state.error = action.payload
        state.initialized = true
      })
      .addCase(getWishList.pending, (state) => {
        state.initialized = false
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.wishList = action.payload
        state.initialized = true
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.error = action.payload
        state.initialized = true
      })
  }
})

export default wishListSlice.reducer