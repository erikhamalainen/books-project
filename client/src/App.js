import React from 'react'
import { Container, AppBar, Typography } from '@mui/material'
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.js'
import Books from './features/Books/Books'
import './App.scss'

export default function App() {
  return (
    <Container maxwidth="lg">
      <AppBar className="appBar" position="static" color="inherit">
        <Typography className="heading" variant="h1" align="center">
          Books
        </Typography>
      </AppBar>
      <Container>
        <ErrorBoundary>
          <Books />
        </ErrorBoundary>
      </Container>
    </Container>
  )
}
