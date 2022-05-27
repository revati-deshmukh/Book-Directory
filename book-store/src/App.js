import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import {
  EditBookPage,
  HomePage,
  AddBookPage
} from './containers';
import Container from '@mui/material/Container';
import {
  makeStyles
} from '@material-ui/core';
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  h1: {
    color: '#428284',
    marginLeft: '0.5em !important'
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div>
      <Container fixed>
        <Typography variant="h3" className={classes.h1}>
          Book Directory
        </Typography>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:id" element={<EditBookPage />} />
            <Route path="/addbook" element={<AddBookPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
