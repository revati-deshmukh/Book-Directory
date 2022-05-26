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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<EditBookPage />} />
        <Route path="/addbook" element={<AddBookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
