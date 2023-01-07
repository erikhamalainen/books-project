import React, { useState, useEffect } from 'react'
import { useDispatch, } from 'react-redux'
import { Grid } from '@mui/material'
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary.js'
import { loadBooks } from './bookSlice.js'
import Table from './Table/Table'
import Form from './Form/Form'

export default function Books() {
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(null)
  useEffect(() => {
    dispatch(loadBooks())
  }, [dispatch])

  return (
    <Grid container justify="space-between" alignItems="stretch" spacing="3">
      <Grid item xs={12} sm={4}>
        <ErrorBoundary>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </ErrorBoundary>
      </Grid>
      <Grid item xs={12} sm={7}>
        <ErrorBoundary>
          <Table setCurrentId={setCurrentId} />
        </ErrorBoundary>
      </Grid>
    </Grid>
  )
}
