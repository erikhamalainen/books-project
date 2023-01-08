import axios from 'axios';
import { setError, setMessage } from '../session/sessionSlice';

const config = {
  baseURL: process.env.REACT_APP_API_URL,
};

const api = axios.create({
  ...config,
});
let store = null;

export const injectStore = (_store) => {
  store = _store;
};

api.interceptors.response.use(
  (response) => {
    // for http status 2xx
    store.dispatch(setMessage(response?.data?.message));
    return response;
  }, // for http status 2xx
  (error) => {
    // For http status not 2xx
    let errorMsg = error?.response?.data?.message;

    if (!errorMsg) {
      errorMsg = error?.response?.data?.error;
    }

    if (!errorMsg && !error?.response) {
      errorMsg = 'Network error';
    }

    if (!errorMsg) {
      // eslint-disable-next-line no-console
      console.log('message not found from this error:', error);
      errorMsg = 'Something went wrong';
    }
    store.dispatch(setError(errorMsg));
    return Promise.reject(error?.response?.data || error);
  },
);

export function getAllBooks() {
  return api.get('books');
}

export function createBook(data) {
  return api.post('books/createBook', data);
}

export function updateBookById(id, data) {
  return api.put(`books/${id}`, data);
}

export function deleteBookById(id) {
  return api.delete(`books/${id}`);
}
