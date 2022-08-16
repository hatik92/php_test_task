import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loginAs: 'student',
  signInRoute: "api/loginStudent",
  signOutRoute: "api/logoutStudent",
  userObjectRoute: "api/student",
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginAsUser(state, action) {
      if (action.payload) {
        state.loginAs= 'librarian'
        state.signInRoute = "api/login"
        state.signOutRoute = "api/logout"
        state.userObjectRoute = "api/user"
      } else {
        state.loginAs= 'student'
        state.signInRoute = "api/loginStudent"
        state.signOutRoute = "api/logoutStudent"
        state.userObjectRoute = "api/student"
      }
    }
  },
})



export const { loginAsUser } = loginSlice.actions
export default loginSlice.reducer