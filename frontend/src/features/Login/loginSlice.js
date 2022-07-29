import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from './../../api/api';


const initialState = {
  isAuth: false,
  csrfConfig: {},
  csrfConfigError: '',
  user: '',
  loginData: {
    email:'',
    password:''
  },
  error: ''

}

// export const csrf = createAsyncThunk(
//   'login/getCSRF',
//   async (payload, {rejectWithValue}) => {
//     try {
//       const response = await getUser.csrf().then(res => console.log(res))
//       if (response.status !== 204) throw new Error(response.response.data.error)
//       return response
//     } catch (error) {
//       return rejectWithValue(error)
//     }
//   }
// )

export const login = createAsyncThunk(
  'login/isLogin',

  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await getUser.login(payload.email, payload.password)
      if (response.status !== 200) throw new Error(response.response.data.error)
      return response.data.request
    } catch (error) {
      return rejectWithValue(error)
    } 
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      // .addCase(csrf.pending, (state, action) => {
      //   // state.csrfConfig = action.payload
      // })
      // .addCase(csrf.fulfilled, (state, action) => {
      //   state.csrfConfig = action.payload
      // })
      // .addCase(csrf.rejected, (state, action) => {
      //   // state.csrfConfigError = action.payload
      // })
      .addCase(login.pending, (state) => {
        state.isAuth = false
      })
      .addCase(login.fulfilled, (state, action) => {
        
      })
      .addCase(login.rejected, (state, action) => {
        // state.error = 
        console.log(action);
      })
  }
})

export default loginSlice.reducer