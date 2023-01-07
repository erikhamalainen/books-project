import { configureStore } from '@reduxjs/toolkit'
import bookReducer from '../features/Books/bookSlice'

export const middleware = () => {
  return (next) => (action) => {
    next(action)
  }
}

export default configureStore({
  reducer: {
    books: bookReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([middleware]),
})
