import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loginAs: 'librarian',
  signInRoute: "api/login",
  signOutRoute: "api/logout",
  userObjectRoute: "api/user",
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginAsUser(state, action) {
      if (action.payload) {
        state.loginAs= 'librarian'
        state.signInRoute = "api/login"
        state.userObjectRoute = "api/user"
      } else {
        state.loginAs= 'student'
        state.signInRoute = "api/loginStudent"
        state.userObjectRoute = "api/student"
      }
    }
  },
})



export const { loginAsUser } = loginSlice.actions
export default loginSlice.reducer