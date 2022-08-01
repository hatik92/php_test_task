import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/Books/booksSlice';
import studentsReducer from '../features/Students/studentsSlice';
import studentReducer from '../features/Student/studentSlice';
import bookReducer from '../features/Book/bookSlice';
import loginReducer from '../features/Login/loginSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    books: booksReducer,
    book: bookReducer,
    students: studentsReducer,
    student: studentReducer,
  },
});
