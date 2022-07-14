import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/Books/booksSlice';
import bookReducer from '../features/Book/bookSlice';
import searchBookReducer from '../features/Books/SearchBook/searchBookSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    searchBook: searchBookReducer,
    book: bookReducer,
  },
});
