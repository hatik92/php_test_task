import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/Books/booksSlice';
import studentsReducer from '../features/Students/studentsSlice';
import bookReducer from '../features/Book/bookSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    students: studentsReducer,
    book: bookReducer,
  },
});
