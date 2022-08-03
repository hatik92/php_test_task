import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getUser } from './../../api/api';


const initialState = {
  initializad: false,
  isAuth: false,
  csrfConfig: {},
  csrfConfigError: '',
  user: {},
  loginData: {
    email: '',
    password: ''
  },
  error: ''
}

// export const login = createAsyncThunk(
//   'login/isLogin',

//   async (payload, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await getUser.login(payload.email, payload.password)
//       if (response.status !== 200) throw new Error(response.response.data.error)
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error)
//     } 
//   }
// )

// export const getCurrentUser = createAsyncThunk(
//   'login/getUser',
//   async(payload, {rejectWithValue}) => {
//     try {
//       const res = await getUser.getUser()

//       if (res.status !== 200) throw new Error(res.response.data.error)
//       return res.data
//     } catch (error) {
//       return rejectWithValue(error.response)
//     }
//   }
// )

// export const logout = createAsyncThunk(
//   'login/logout',

//   async (payload, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await getUser.logout()
//       if (response.status !== 200) throw new Error(response.response.data.error)
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error)
//     } 
//   }
// )


export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getUser(state, action) {
      // const isAaaaa = store.getState()
      state.user = action.payload
      state.initializad = true
    }
  },
  // extraReducers: (builder) => {
  // builder
  // .addCase(login.pending, (state) => {
  //   state.isAuth = false
  // })
  // .addCase(login.fulfilled, (state, action) => {
  //   state.user = action.payload
  //   state.isAuth = true
  // })
  // .addCase(login.rejected, (state, action) => {
  // })

  // .addCase(logout.pending, (state) => {
  //   state.isAuth = false
  // })
  // .addCase(logout.fulfilled, (state, action) => {
  //   state.isAuth = false
  // })
  // .addCase(logout.rejected, (state, action) => {
  // })

  // .addCase(getCurrentUser.pending, (state) => {
  //   state.isAuth = false
  // })
  // .addCase(getCurrentUser.fulfilled, (state, action) => {
  //   state.user = action.payload
  //   state.isAuth = true
  //   state.initializad = true
  // })
  // .addCase(getCurrentUser.rejected, (state, action) => {
  //   state.initializad = true
  //   state.error = action.payload
  // })
  // }
})



export const { getUser } = loginSlice.actions

export default loginSlice.reducer