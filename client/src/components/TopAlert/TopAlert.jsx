import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button } from '@mui/material';
import {
  selectError, setError, selectMessage, setMessage,
} from '../../session/sessionSlice';

export default function TopAlert() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const message = useSelector(selectMessage);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    setSuccessMessage(message);
  }, [message]);

  const closeAlert = () => {
    if (message) {
      dispatch(setMessage(null));
    } else {
      dispatch(setError(null));
    }
  };

  return (
    (errorMessage || successMessage) && (
    <Alert
      severity={errorMessage ? 'error' : 'success'}
      action={(
        <Button color="inherit" size="small" onClick={closeAlert}>
          X
        </Button>
      )}
    >
      {(errorMessage || successMessage)}
    </Alert>
    )
  );
}
