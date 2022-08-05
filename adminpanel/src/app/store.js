import { configureStore } from '@reduxjs/toolkit'
// import loginReducer from '../features/Login/loginSlice';
import appReducer from '../appSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    // login: loginReducer,
  },
})
