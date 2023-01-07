import React from 'react'
import { Container, Typography } from '@mui/material'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    const message = 'Something went wrong'
    this.state = { error: null, errorInfo: null, errorMessage: message }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
    console.log('Error caught', error, errorInfo)
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Container>
          <Typography className="justify-content-md-center" variant="h3">
            {this.state.errorMessage}
          </Typography>
        </Container>
      )
    }
    return this.props.children
  }
}
