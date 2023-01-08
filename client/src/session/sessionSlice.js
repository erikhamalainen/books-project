/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  error: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setError } = sessionSlice.actions;

export const selectError = (state) => state.session.error;

export default sessionSlice.reducer;
