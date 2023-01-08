import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { loadBooks, selectLoading } from './bookSlice';
import Table from './Table/Table';
import Form from './Form/Form';
import { setError } from '../../session/sessionSlice';

export default function Books() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (loading) {
      dispatch(setError(null));
    }
  }, [dispatch, loading]);

  useEffect(() => {
    dispatch(loadBooks());
  }, [dispatch]);

  return (
    <Grid
      sx={{
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        margin: '20px',
        width: 'auto',
      }}
      container
    >
      <Grid item xs={12} sm={4}>
        <ErrorBoundary>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </ErrorBoundary>
      </Grid>
      <Grid item xs={12} sm={7}>
        <ErrorBoundary>
          <Table currentId={currentId} setCurrentId={setCurrentId} />
        </ErrorBoundary>
      </Grid>
    </Grid>
  );
}
