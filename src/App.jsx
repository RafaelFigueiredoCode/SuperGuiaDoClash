import React from 'react';
import CardsList from './paginas/home.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetalheClasher from './paginas/Detalhes'

const App = () => (
  <Router>
      <Routes>
        <Route path="/" element={<CardsList/>} />
        <Route path="/card/:id" element={<DetalheClasher/>} />
      </Routes>
  </Router>
);
export default App