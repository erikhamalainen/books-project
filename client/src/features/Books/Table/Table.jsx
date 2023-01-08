/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectBooks, selectLoading } from '../bookSlice';
import EnhancedTableHead from '../../../components/EnhancedTableHead/EnhancedTableHead';
import { getComparator } from '../../../util/bookTableSorters';

const headCells = [
  {
    id: 'title',
    label: 'Title',
  },
  {
    id: 'author',
    label: 'Author',
  },
];

export default function BooksTable({ currentId, setCurrentId }) {
  const books = useSelector(selectBooks);
  const loading = useSelector(selectLoading);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('title');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
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

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0;

  return loading ? (
    <CircularProgress />
  ) : (
    <>
      <TableContainer sx={{ marginY: '6px' }} component={Paper}>
        <Table stickyHeader>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <TableBody>
            {books.slice().sort(getComparator(order, orderBy))
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
