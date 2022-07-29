import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/Books/booksSlice';
import studentsReducer from '../features/Students/studentsSlice';
import bookReducer from '../features/Book/bookSlice';
import loginReducer from '../features/Login/loginSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    books: booksReducer,
    students: studentsReducer,
    book: bookReducer,
  },
});
