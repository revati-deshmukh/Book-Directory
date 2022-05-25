import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBook, updateBook, deleteBook } from './EditBookPage.duck';
import { useParams } from 'react-router-dom';
import {
    makeStyles,
    Paper,
    Button
} from '@material-ui/core';
import { EditBookForm } from '../../forms';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: '0 auto 22px auto',
        maxWidth: 800,
    },
    title: {
        margin: '24px auto',
        textAlign: 'center'
    },
    description: {
        padding: '0 24px'
    },
    deleteButton: {
        marginTop: 20,
    }
}));

function EditBookPage(props) {
    const dispatch = useDispatch();
    const {
        fetchBookInProgress,
        fetchBookError,
        book,
        updateInProgress,
        updateError,
        deleteBookInProgress,
        deleteBookError
    } = useSelector(state => state.EditBookPage);

    const classes = useStyles();

    const { id } = useParams();

    useEffect(() => {
        if (id) dispatch(fetchBook(id))
    }, [dispatch, props])

    return (
        <div>
            {fetchBookInProgress ? <p>Loading...</p> : null}
            {fetchBookError ? <p>Error fetching book.</p> : null}
            {book ? (
                <Paper className={classes.paper}>
                    {updateInProgress ? <p>Updating...</p> : null}
                    {updateError ? <p>Error while updating a book.</p> : null}

                    {deleteBookInProgress ? <p>Deleting...</p> : null}
                    {deleteBookError ? <p>Error while updating a book.</p> : null}

                    <EditBookForm
                        keepDirtyOnReinitialize
                        initialValues={{ ...book }}
                        onSubmit={values => dispatch(updateBook(values))} />

                    <Button variant="contained" color="secondary"
                        onClick={() => dispatch(deleteBook(book.isbn))}
                        className={classes.deleteButton}>
                        Delete
                    </Button>
                </Paper>
            ) : null}
        </div>
    );
}

export default EditBookPage;
