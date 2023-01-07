import React from 'react'
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { selectBooks, selectLoading } from '../bookSlice'
import './Table.scss'

export default function BooksTable({ setCurrentId }) {
  const books = useSelector(selectBooks)
  const loading = useSelector(selectLoading)
  const rowClickHandler = (e, book) => {
    setCurrentId(book._id)
  }

  //TODO: Checkboxi riville jotta voi valita ja poistaa valinnan? selvyys
  return loading ? (
    <CircularProgress />
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600, minHeight: 200, maxWidth: 1000, maxHeight: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Title</TableCell>
            <TableCell align="left">Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow
              onClick={(e) => rowClickHandler(e, book)}
              hover
              key={book._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {book.title}
              </TableCell>
              <TableCell align="left">{book.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
