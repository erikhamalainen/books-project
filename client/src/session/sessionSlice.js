/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  error: null,
  message: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setError, setMessage } = sessionSlice.actions;

export const selectError = (state) => state.session.error;

export const selectMessage = (state) => state.session.message;

export default sessionSlice.reducer;
