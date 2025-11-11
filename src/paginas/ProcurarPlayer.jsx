import React, { useState, useContext } from 'react';
import useFetch from '../components/useFetch.jsx';
import { ThemeContext } from '../components/ThemeContext';
import { Link } from 'react-router-dom';

const Procurardata = () => {
  const [termo, setTermo] = useState('');
  const [url, setUrl] = useState(null);
  const { data, loading, error } = useFetch(url);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const API_URL = 'https://superguiadoclash.onrender.com';

  console.log('🔎 Buscando:', url);

  const handleBuscar = () => {
    if (!termo.trim()) return;
    setUrl(`${API_URL}/api/player/${encodeURIComponent(termo.replace('#', ''))}`);
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
          <button onClick={toggleTheme} style={{ 
        marginBottom: '20px', 
        marginLeft: '1580px', 
        cursor: 'pointer',         
        backgroundColor: 'tomato',
        color: '#fff',
        border: 'none',
        borderRadius: '8px', 
        padding: '10px 15px',
         }}>
            Trocar Tema
          </button>
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
         <Link to={'/'} style={{
              display: 'inline-block',
              marginTop: '15px',
              backgroundColor: theme === 'light' ? '#000' : '#fff',
              color: theme === 'light' ? '#fff' : '#000',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              marginBottom: '15px'
            }}>
              Voltar
            </Link>
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
    </div>

    <Link to={`/player/${data.tag.replace('#', '')}`} style={{
              display: 'inline-block',
              marginTop: '15px',
              backgroundColor: theme === 'light' ? '#000' : '#fff',
              color: theme === 'light' ? '#fff' : '#000',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none'
            }}>
              Ver Mais
            </Link>
  </div>
      )}
    </div>
  );
};

    export default Procurardata;
