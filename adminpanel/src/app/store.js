import { configureStore } from '@reduxjs/toolkit'
// import loginReducer from '../features/Login/loginSlice';
import appReducer from '../appSlice'
import allBooksReducer from '../views/Books/AllBooks/allBooksSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    allBooks: allBooksReducer,
    // login: loginReducer,
  },
})
