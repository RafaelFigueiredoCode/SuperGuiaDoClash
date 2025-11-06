import React, { useState, useContext } from 'react';
import useFetch from '../components/useFetch.jsx';
import { ThemeContext } from '../components/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Procurardata = () => {
  const [termo, setTermo] = useState('');
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(url);
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log('🔎 Buscando:', url);

  const handleBuscar = () => {
    if (!termo.trim()) return;
    setUrl(`http://localhost:3001/api/player/${encodeURIComponent(termo.replace('#', ''))}`);
  };
    const themeStyles = {
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#121212',
        color: theme === 'light' ? '#222' : '#fff',
            transition: 'all 0.3s ease',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px',
          };
            
          return (
            <div
              style={{
                ...themeStyles,
                backgroundColor: theme === 'light' ? '#f5f5f5' : '#222',
                color: theme === 'light' ? '#000' : '#fff',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '30px',
                transition: 'all 0.3s ease',
              }}
            >
              <h1 
              style={{
                marginLeft: '-85px'
              }}
              >🔍Procurar Jogador</h1>
        
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Digite a TAG do jogador (ex: #P2LY88Q)"
                  value={termo}
                  onChange={(e) => setTermo(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    width: '250px',
                  }}
                />
                <button
                  onClick={handleBuscar}
                  style={{
                    backgroundColor: 'tomato',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                  }}
                >
                  Buscar
                </button>
              </div>
        
              {loading && <p>Carregando...</p>}
              {error && <p style={{ color: 'red' }}>❌ Erro ao buscar dados</p>}
        
              {data?.tag && (
    <div style= {{backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',}}
    >
    <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
    <p className="text-gray-400 mb-4">#{data.tag}</p>

    <div className="space-y-2 text-sm">
      <p><strong>Nível:</strong> {data.expLevel}</p>
      <p><strong>Trofeus atuais:</strong> {data.trophies}</p>
      <p><strong>Melhor pontuação:</strong> {data.bestTrophies}</p>
      <p><strong>Vitórias:</strong> {data.wins}</p>
      <p><strong>Derrotas:</strong> {data.losses}</p>
      <p><strong>3 coroas:</strong> {data.threeCrownWins}</p>
      <p><strong>Doações totais:</strong> {data.totalDonations}</p>
    </div>

    <div className="mt-4 p-3 bg-gray-800 rounded-lg">
      <p><strong>Clã:</strong> {data.clan.name}</p>
      <p><strong>Tag:</strong> {data.clan.tag}</p>
    </div>

    <div className="mt-3 text-sm text-gray-400">
      <p><strong>Arena:</strong> {data.arena.name}</p>
    </div>
    <button
    onClick={() => navigate(`/player/${data.tag.replace('#', '')}`)}
    >ver mais</button>
  </div>
      )}
    </div>
  );
};

    export default Procurardata;
