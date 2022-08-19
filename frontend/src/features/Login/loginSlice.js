import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loginAs: null,
  signInRoute: null,
  // signOutRoute: null,
  userObjectRoute: null,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginAsUser(state, action) {
      if (action.payload === "librarian") {
        state.loginAs= 'librarian'
        state.signInRoute = "api/login"
        // state.signOutRoute = "api/logout"
        state.userObjectRoute = "api/user"
      } else if(action.payload === "student") {
        state.loginAs= 'student'
        state.signInRoute = "api/loginStudent"
        // state.signOutRoute = "api/logoutStudent"
        state.userObjectRoute = "api/student"
      }
    }
  },
})



export const { loginAsUser } = loginSlice.actions
export default loginSlice.reducer