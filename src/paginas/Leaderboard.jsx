import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../components/ThemeContext';

export default function LeaderboardPage() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const themeStyles = {
    backgroundColor: theme === 'light' ? '#f5f5f5' : '#222',
    color: theme === 'light' ? '#000' : '#fff',
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.3s ease',
  };

  // 🔹 Busca as localizações ao carregar
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get('/api/locations');
        setLocations(res.data.items);
      } catch (err) {
        setError('Erro ao carregar localizações');
      }
    };
    fetchLocations();
  }, []);

  // 🔹 Busca o ranking do país selecionado
  const handleSearch = async () => {
    if (!selectedLocation) return;
    setLoading(true);
    setError('');
    setRanking([]);

    try {
      const res = await axios.get(`/api/locations/${selectedLocation}/rankings/players`);
      setRanking(res.data.items);
      if (res.data.items.length === 0) setError('Nenhum jogador encontrado (ranking vazio).');
    } catch (err) {
      setError('Erro ao buscar ranking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={themeStyles}>
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: theme === 'light' ? '#000' : '#fff',
          color: theme === 'light' ? '#fff' : '#000',
          borderRadius: '8px',
          padding: '10px 15px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Trocar Tema
      </button>

      <h1>🌍 Leaderboard</h1>

      {/* 🔸 Seletor de localizações */}
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        style={{
          padding: '10px',
          borderRadius: '8px',
          marginRight: '10px'
        }}
      >
        <option value="">Selecione uma região...</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleSearch}
        style={{
          padding: '10px 15px',
          borderRadius: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Buscar Ranking
      </button>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'tomato' }}>{error}</p>}

      {/* 🔸 Lista do ranking */}
      <div style={{ marginTop: '20px' }}>
        {ranking.map((player, index) => (
          <div
            key={player.tag}
            style={{
              backgroundColor: theme === 'light' ? '#fff' : '#333',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3>#{player.rank} — {player.name}</h3>
            <p>Troféus: 🏆 {player.trophies}</p>
            {player.clan && <p>Clã: {player.clan.name}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}