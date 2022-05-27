import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from './HomePage.duck';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Container from '@mui/material/Container';
import ReactReadMoreReadLess from "react-read-more-read-less";
import Rating from '@mui/material/Rating';
import {
    makeStyles,
    Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: '0 auto 22px auto',
        maxWidth: 800,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    link: {
        marginTop: 7
    },
    addBook: {
        backgroundColor: '#3b989b',
        float: 'right',
        color: '#fff',
        fontSize: 15
    }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: 18,
        backgroundColor: '#74c6c9',
        color: '#fff',
        fontWeight: 500
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function HomePage() {
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rating, setRating] = useState(0)

    const {
        fetchBooksInProgress,
        fetchBooksError,
        books
    } = useSelector(state => state.HomePage);

    useEffect(() => {
        dispatch(fetchBooks())
    }, [dispatch]);

    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0;

    const handleRating = (rate) => {
        setRating(rate)
    }

    return (
        <div>
            {fetchBooksInProgress ? <p>Loading...</p> : null}
            {fetchBooksError ? <p>Error fetching books</p> : null}
            <Container fixed>
                <Link to={`/addbook`}>
                    <Button variant="contained" size="medium"
                        className={classes.addBook}
                        style={{ marginBottom: "10px" }}
                    >Add Book
                    </Button>
                </Link>
                <TableContainer>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Book Cover</StyledTableCell>
                                <StyledTableCell align="left">Title</StyledTableCell>
                                <StyledTableCell align="left">Authors</StyledTableCell>
                                <StyledTableCell align="left">Published</StyledTableCell>
                                <StyledTableCell align="left">Categories</StyledTableCell>
                                <StyledTableCell align="left">Description</StyledTableCell>
                                <StyledTableCell align="left">Ratings</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((book, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell className={classes.image} style={{ width: 100 }}>
                                                <img className={classes.img} alt={book.title} src={book.thumbnailUrl}></img>
                                            </TableCell>
                                            <TableCell style={{ width: 200 }}>
                                                <Link to={`/${book.isbn}`}>{book.title}</Link>
                                            </TableCell>
                                            <TableCell style={{ width: 100 }}>
                                                {book.authors.join(", ")}
                                            </TableCell>
                                            <TableCell style={{ width: 150 }}>
                                                {book.publishedDate}
                                            </TableCell>
                                            <TableCell style={{ width: 120 }}>
                                                {book.categories.join(", ")}
                                            </TableCell>
                                            <TableCell style={{ width: 240 }}>
                                                <ReactReadMoreReadLess
                                                    charLimit={100}
                                                    readMoreText={"Read more ▼"}
                                                    readLessText={"Read less ▲"}
                                                >
                                                    {book.shortDescription}
                                                </ReactReadMoreReadLess>
                                            </TableCell>
                                            <TableCell style={{ width: 80 }}>
                                                <Rating name="half-rating-read"
                                                    value={book.ratings}
                                                    precision={0.5}
                                                    readOnly />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={books.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Container>
        </div >
    );
}

export default HomePage