import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from './AddBookPage.duck';
import { useNavigate } from 'react-router-dom';
import {
    makeStyles,
    Paper,
    Button
} from '@material-ui/core';
import { AddBookForm } from '../../forms';

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
    cancelButton: {
        marginTop: -37,
        float: 'right',
        color: '#FF0000'
    }
}));

function AddBookPage() {
    const dispatch = useDispatch();
    const {

    } = useSelector(state => state.AddBookPage);

    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {

    }, [dispatch])

    return (
        <div>
            <Paper className={classes.paper}>
                <AddBookForm onSubmit={values => dispatch(addBook(values))} />

                <Button color="secondary"
                    onClick={() => navigate('/')}
                    className={classes.cancelButton}>
                    Cancel
                </Button>

            </Paper>
        </div>
    );
}

export default AddBookPage;
