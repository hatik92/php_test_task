import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  initializad: false,
  isAuth: true,
  user: {},
  error: ''
}


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload
      state.initializad = true
    },
    getAtuh(state, action) {
      state.isAuth = false
    }
  }
})
export const { getUser, getAtuh } = appSlice.actions

export default appSlice.reducer