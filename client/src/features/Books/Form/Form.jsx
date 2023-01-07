import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { selectBooks, updateBook, deleteBook } from '../bookSlice'
import { addBook } from '../bookSlice'

export default function Form({ currentId, setCurrentId }) {
  const [bookData, setBookData] = useState({ title: '', author: '', description: '' })
  const dispatch = useDispatch()
  const selectedBookData = useSelector(selectBooks).find((book) => book._id === currentId)

  useEffect(() => {
    if (selectedBookData) {
      setBookData({
        title: selectedBookData.title,
        author: selectedBookData.author,
        description: selectedBookData.description,
      })
    }
  }, [selectedBookData])

  const validationSchema = yup.object({
    title: yup.string('Enter Title').required('Title is required'),
    author: yup.string('Enter author'),
    description: yup.string('Enter description').max(500, 'Description can not be longer than 500 merkkiä'),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: bookData.title ?? '',
      author: bookData.author ?? '',
      description: bookData.description ?? '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (currentId) {
        dispatch(updateBook({ currentId, values }))
        setSubmitting(false)
      } else {
        dispatch(addBook(values))
        setSubmitting(false)
      }
      clear()
    },
  })

  const clear = () => {
    setCurrentId(null)
    setBookData({ title: '', author: '', description: '' })
  }

  const handleDelete = (id) => {
    dispatch(deleteBook(id))
    clear()
  }

  //TODO: Save nappi enabloituu KUN valittu, ja jos checkboxi pois niin menee takaisin disabled tilaan
  return (
    <Paper className="paper">
      <form className="root form" onSubmit={formik.handleSubmit}>
        <Typography variant="h6">{currentId ? 'Updating a book' : 'Creating a book'}</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          name="author"
          variant="outlined"
          label="Author"
          fullWidth
          value={formik.values.author}
          onChange={formik.handleChange}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Button className="save-button" variant="contained" size="medium" type="submit">
          Save as new
        </Button>
        <Button className="update-button" disabled={!currentId} variant="contained" size="medium" type="submit">
          Save
        </Button>
        <Button
          className="delete-button"
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
  )
}
