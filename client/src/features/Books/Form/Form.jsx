/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Typography, Paper,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectBooks, updateBook, deleteBook, addBook,
} from '../bookSlice';

export default function Form({ currentId, setCurrentId }) {
  const [bookData, setBookData] = useState({ title: '', author: '', description: '' });
  const dispatch = useDispatch();
  const selectedBookData = useSelector(selectBooks).find((book) => book._id === currentId);

  useEffect(() => {
    if (selectedBookData) {
      setBookData({
        title: selectedBookData.title,
        author: selectedBookData.author,
        description: selectedBookData.description,
      });
    }
  }, [selectedBookData]);

  const clear = () => {
    setCurrentId(null);
    setBookData({ title: '', author: '', description: '' });
  };

  useEffect(() => {
    if (currentId === null) {
      clear();
    }
  }, [currentId]);

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    author: yup.string(),
    description: yup.string(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: bookData.title ?? '',
      author: bookData.author ?? '',
      description: bookData.description ?? '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const updating = document.activeElement.dataset.flag === 'update';
      if (currentId && updating) {
        dispatch(updateBook({ currentId, values }));
        setSubmitting(false);
      } else {
        dispatch(addBook(values));
        setSubmitting(false);
      }
      setCurrentId(null);
      formik.resetForm();
    },
  });

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
    clear();
  };

  return (
    <Paper>
      <form onSubmit={formik.handleSubmit}>
        <Typography
          sx={{
            margin: '5px',
          }}
          variant="h6"
        >
          {currentId ? 'Updating a book' : 'Creating a book'}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          margin="dense"
          sx={{
            margin: '5px',
            width: '90%',
          }}
          required
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          name="author"
          variant="outlined"
          label="Author"
          margin="dense"
          sx={{
            margin: '5px',
            width: '90%',
          }}
          value={formik.values.author}
          onChange={formik.handleChange}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          margin="dense"
          sx={{
            margin: '5px',
            width: '90%',
          }}
          multiline
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Button
          sx={{
            margin: '5px',
          }}
          variant="contained"
          size="medium"
          type="submit"
          data-flag="create"
        >
          Save new
        </Button>
        <Button
          sx={{
            margin: '5px',
          }}
          disabled={!currentId || !formik.dirty}
          variant="contained"
          size="medium"
          type="submit"
          data-flag="update"
        >
          Save
        </Button>
        <Button
          sx={{
            margin: '5px',
          }}
          disabled={!currentId}
          variant="contained"
          size="medium"
          color="warning"
          onClick={() => handleDelete(currentId)}
        >
          Delete
        </Button>
      </form>
    </Paper>
  );
}
