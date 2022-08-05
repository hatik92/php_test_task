import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  initializad: false,
  isAuth: true,
  user: {},
  error: '',
  setShow: {},
}
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    set(state, action) {
      state.setShow = action.payload
    },
    getUser(state, action) {
      state.user = action.payload
      state.initializad = true
    },
    getAtuh(state, action) {
      state.isAuth = false
    },
  },
})
export const { getUser, getAtuh, set } = appSlice.actions
export default appSlice.reducer
