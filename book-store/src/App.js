import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import {
  EditBookPage,
  HomePage
} from './containers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/:id" element={<EditBookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
