/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllBooks, createBook, updateBookById, deleteBookById,
} from '../../api/requests';

export const loadBooks = createAsyncThunk('books/loadBooks', async () => {
  const { data } = await getAllBooks();
  return data;
});

export const addBook = createAsyncThunk('books/addBook', async (bookData) => {
  const { data } = await createBook(bookData);
  return data;
});

export const updateBook = createAsyncThunk('books/updateBook', async (bookData) => {
  const { currentId, values } = bookData;
  const { data } = await updateBookById(currentId, values);
  return data;
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  const { data } = await deleteBookById(id);
  return data;
});

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    loading: false,
    error: '',
    allBooks: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.allBooks = action.payload.books;
    });
    builder.addCase(loadBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(addBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      const { bookData } = action.payload;
      if (bookData) {
        state.allBooks.unshift(bookData);
      }
      state.error = null;
      state.loading = false;
    });
    builder.addCase(addBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(updateBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBook.fulfilled, (state, action) => {
      const { updatedBook } = action.payload;
      if (updatedBook) {
        const bookIndex = state.allBooks.findIndex((book) => book._id === updatedBook._id);
        state.allBooks[bookIndex] = updatedBook;
      }
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(deleteBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      const { id } = action.payload;
      if (id) {
        const updatedBookList = state.allBooks.filter((book) => book._id !== id);
        state.allBooks = updatedBookList;
      }
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const selectLoading = (state) => state.books.loading;

export const selectBooks = (state) => state.books.allBooks;

export default bookSlice.reducer;
