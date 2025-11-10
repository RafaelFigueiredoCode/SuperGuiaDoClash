import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../components/ThemeContext';

export default function Leaderboard() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('57000000'); // Global por padrão
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { theme } = useContext(ThemeContext);

  // 🎯 Carregar as localizações
  useEffect(() => {
    axios.get('http://localhost:3001/api/locations')
      .then((res) => setLocations(res.data.items))
      .catch((err) => console.error('Erro ao buscar localizações:', err));
  }, []);

  // 🏆 Buscar ranking quando a localização mudar
  useEffect(() => {
    if (!selectedLocation) return;

    const fetchRankings = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await axios.get(
          `http://localhost:3001/api/locations/${selectedLocation}/rankings/players`
        );

        if (response.data.items.length === 0) {
          // 🔍 Caso vazio — API retornou lista vazia
          setPlayers([]);
          setError('Os placares locais estão temporariamente desativados pela Supercell.');
        } else {
          setPlayers(response.data.items);
        }

      } catch (err) {
        console.error('Erro ao buscar ranking:', err);
        setError('Não foi possível carregar o ranking.');
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [selectedLocation]);

  const themeStyles = {
    backgroundColor: theme === 'light' ? '#f5f5f5' : '#121212',
    color: theme === 'light' ? '#000' : '#fff',
    minHeight: '100vh',
    padding: '30px',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={themeStyles}>
      <h2>🏅 Leaderboard</h2>

      {/* Seleção de localização */}
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        style={{
          padding: '10px',
          marginTop: '10px',
          borderRadius: '8px',
          border: '1px solid gray'
        }}
      >
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>

      {loading && <p>Carregando ranking...</p>}
      {error && <p style={{ color: 'gray', marginTop: '15px' }}>⚠️ {error}</p>}

      {/* Exibir lista se houver */}
      {!loading && players.length > 0 && (
        <div
          style={{
            marginTop: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
          }}
        >
          {players.map((player) => (
            <div
              key={player.tag}
              style={{
                border: theme === 'light' ? '1px solid #000' : '1px solid #fff',
                borderRadius: '10px',
                padding: '15px',
              }}
            >
              <h3>{player.name}</h3>
              <p>Tag: {player.tag}</p>
              <p>Troféus: {player.trophies}</p>
              <p>Posição: #{player.rank}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}