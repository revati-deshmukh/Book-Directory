import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from './HomePage.duck';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import ReactReadMoreReadLess from "react-read-more-read-less";
import {
    makeStyles,
    Grid,
    Paper,
    Typography,
    ButtonBase,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 22
    },
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
    }
}));

function HomePage() {
    const dispatch = useDispatch();
    const {
        fetchBooksInProgress,
        fetchBooksError,
        books
    } = useSelector(state => state.HomePage);

    useEffect(() => {
        dispatch(fetchBooks())
    }, [dispatch]);

    const classes = useStyles();

    return (
        <div>
            {fetchBooksInProgress ? <p>Loading...</p> : null}
            {fetchBooksError ? <p>Error fetching books</p> : null}
            <Container fixed>
                <TableContainer>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Book Cover</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Authors</TableCell>
                                <TableCell align="left">Published</TableCell>
                                <TableCell align="left">Categories</TableCell>
                                <TableCell align="left">Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map((book, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell className={classes.image} style={{ width: 100 }}>
                                            <img className={classes.img} alt={book.title} src={book.thumbnailUrl}></img>
                                        </TableCell>
                                        <TableCell style={{ width: 200 }}>
                                            {book.title}
                                        </TableCell>
                                        <TableCell style={{ width: 100 }}>
                                            {book.authors.join(", ")}
                                        </TableCell>
                                        <TableCell style={{ width: 100 }}>
                                            {book.publishedDate.$date}
                                        </TableCell>
                                        <TableCell style={{ width: 160 }}>
                                            {book.categories.join(", ")}
                                        </TableCell>
                                        <TableCell style={{ width: 200 }}>
                                            <ReactReadMoreReadLess
                                                charLimit={100}
                                                readMoreText={"Read more ▼"}
                                                readLessText={"Read less ▲"}
                                            >
                                                {book.shortDescription}
                                            </ReactReadMoreReadLess>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}

export default HomePage