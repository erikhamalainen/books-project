import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button } from '@mui/material';
import { selectError, setError } from '../../session/sessionSlice';

export default function TopAlert() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const closeAlert = () => {
    dispatch(setError(null));
  };
  return (
    error && (
    <Alert
      severity="error"
      action={(
        <Button color="inherit" size="small" onClick={closeAlert}>
          X
        </Button>
      )}
    >
      {error}
    </Alert>
    )
  );
}
