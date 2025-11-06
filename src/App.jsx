import React from 'react';
import CardsList from './paginas/home.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetalheClasher from './paginas/Detalhes'
import ProcurarClan from './paginas/ProcurarClan.jsx';
import ProcurarPlayer from './paginas/ProcurarPlayer.jsx';
import PlayerDetails from './paginas/PlayerDetails.jsx';
import PlayerBadges from './paginas/PlayerBagdes.jsx';

const App = () => (
  <Router>
      <Routes>
        <Route path="/" element={<CardsList/>} />
        <Route path="/card/:id" element={<DetalheClasher/>} />
        <Route path="/procurar/clã" element={<ProcurarClan/>} />
        <Route path="/procurar/player" element={<ProcurarPlayer/>} />
        <Route path="/player/:tag" element={<PlayerDetails/>} />
        <Route path="/player/:tag/badges" element={<PlayerBadges/>} />
      </Routes>
  </Router>
);
export default App