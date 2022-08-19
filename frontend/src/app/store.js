import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/Books/booksSlice';
import studentsReducer from '../features/Students/studentsSlice';
import studentReducer from '../features/Student/studentSlice';
import wishListReducer from '../features/Profile/WishList/wishListSlice';
import bookReducer from '../features/Book/bookSlice';
import loginReducer from '../features/Login/loginSlice';
import appReducer from '../appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    login: loginReducer,
    books: booksReducer,
    book: bookReducer,
    students: studentsReducer,
    student: studentReducer,
    wishList: wishListReducer,
  },
});
