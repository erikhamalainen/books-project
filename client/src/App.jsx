import React from 'react';
import { Container, AppBar, Typography } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Books from './features/Books/Books';
import TopAlert from './components/TopAlert/TopAlert';

export default function App() {
  return (
    <Container maxWidth="lg">
      <ErrorBoundary>
        <AppBar position="static" color="inherit">
          <Typography variant="h1" align="center">
            Books
          </Typography>
        </AppBar>
        <TopAlert />
        <Container>
          <ErrorBoundary>
            <Books />
          </ErrorBoundary>
        </Container>
      </ErrorBoundary>
    </Container>
  );
}
