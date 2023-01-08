/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectBooks, selectLoading } from '../bookSlice';

export default function BooksTable({ currentId, setCurrentId }) {
  const books = useSelector(selectBooks);
  const loading = useSelector(selectLoading);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowClickHandler = (_, book) => {
    setCurrentId(book._id);
  };

  const clearSelection = () => {
    setCurrentId(null);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0;

  return loading ? (
    <CircularProgress />
  ) : (
    <>
      <TableContainer sx={{ marginY: '6px' }} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell variant="head">Title</TableCell>
              <TableCell align="left">Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((book) => (
                <TableRow
                  onClick={(e) => rowClickHandler(e, book)}
                  hover
                  selected={book._id === currentId}
                  key={book._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                >
                  <TableCell component="th" scope="row">
                    {book.title}
                  </TableCell>
                  <TableCell align="left">{book.author}</TableCell>
                </TableRow>
              ))}

            {emptyRows > 0 && (
            // To avoid a layout jump when reaching the last page with empty rows.
            // Hardcoded number 53 comes from documentation (standard height of row)
            <TableRow
              style={{
                height: 53 * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={books.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {currentId && (
        <Button
          sx={{
            margin: '5px',
          }}
          disabled={!currentId}
          variant="contained"
          size="medium"
          color="warning"
          onClick={() => clearSelection()}
        >
          Remove selection
        </Button>
      )}
    </>
  );
}
