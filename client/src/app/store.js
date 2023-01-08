import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../session/sessionSlice';
import bookReducer from '../features/Books/bookSlice';

export const middleware = () => (next) => (action) => {
  next(action);
};

export default configureStore({
  reducer: {
    session: sessionReducer,
    books: bookReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([middleware]),
});
