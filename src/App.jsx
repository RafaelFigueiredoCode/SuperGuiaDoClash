import React from "react";
import CardsList from "./paginas/home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetalheClasher from "./paginas/Detalhes";
import ProcurarClan from "./paginas/ProcurarClan.jsx";
import ProcurarPlayer from "./paginas/ProcurarPlayer.jsx";
import PlayerDetails from "./paginas/PlayerDetails.jsx";
import PlayerBadges from "./paginas/PlayerBagdes.jsx";
import FavoriteCard from "./paginas/FavoriteCard.jsx";
import PlayerBattleLog from "./paginas/PlayerBattleLog.jsx";
import ClanDetails from "./paginas/ClanDetails.jsx";
import ClanMembers from "./paginas/ClanMembers.jsx";
import LeaderboardPage from "./paginas/Leaderboard.jsx";
import DeckGenerator from "./paginas/DeckGenerator.jsx";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CardsList />} />
      <Route path="/card/:id" element={<DetalheClasher />} />
      <Route path="/procurar/clã" element={<ProcurarClan />} />
      <Route path="/procurar/player" element={<ProcurarPlayer />} />
      <Route path="/player/:tag" element={<PlayerDetails />} />
      <Route path="/player/:tag/badges" element={<PlayerBadges />} />
      <Route path="/player/:tag/favoriteCard" element={<FavoriteCard />} />
      <Route path="/player/:tag/battleLog" element={<PlayerBattleLog />} />
      <Route path="/clan/:tag" element={<ClanDetails />} />
      <Route path="/clan/:tag/members" element={<ClanMembers />} />
      <Route
        path="/locations/:locationId/rankings/players"
        element={<LeaderboardPage />}
      />
      <Route path="/deckGenerator" element={<DeckGenerator />} />
    </Routes>
  </Router>
);
export default App;
