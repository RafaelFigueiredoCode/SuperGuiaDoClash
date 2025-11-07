import React, { useState, useContext } from 'react';
import axios from 'axios';
import useFetch from '../components/useFetch.jsx';
import { ThemeContext } from '../components/ThemeContext';
import { Link } from 'react-router-dom';

const ProcurarClan = () => {
    const [termo, setTermo] = useState('');
    const [url, setUrl] = useState(null);
  
    const { data, loading, error } = useFetch(url);

    const { theme, toggleTheme } = useContext(ThemeContext);
  
    const handleBuscar = () => {
        if (!termo.trim()) return;
        setUrl(`http://localhost:3001/api/clans?name=${encodeURIComponent(termo)}`);
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
    
      const cardStyle = {
        backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
        color: theme === 'light' ? '#000' : '#fff',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: theme === 'light'
          ? '0 2px 5px rgba(0,0,0,0.1)'
          : '0 2px 8px rgba(255,255,255,0.1)',
        width: '300px',
      };
    
      const inputStyle = {
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        width: '250px',
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        outline: 'none',
      };
    
      const buttonStyle = {
        backgroundColor: 'tomato',
        border: 'none',
        color: '#fff',
        borderRadius: '8px',
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
      };
    
      return (
        <div style={themeStyles}>
          <h1 style={{ marginBottom: '20px', marginLeft: '-100px' }}>🔍 Procurar Clãs</h1>
    
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Digite o nome do clã..."
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              style={inputStyle}
            />
            <button onClick={handleBuscar} style={buttonStyle}>
              Buscar
            </button>
          </div>

          <Link to={'/'} style={{
              display: 'inline-block',
              marginTop: '15px',
              backgroundColor: theme === 'light' ? '#000' : '#fff',
              color: theme === 'light' ? '#fff' : '#000',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none'
            }}>
              Voltar
            </Link>
    
          {loading && <p>Carregando...</p>}
          {error && <p style={{ color: 'red' }}>❌ Erro ao buscar dados</p>}
    
          <div
            style={{
              position: 'fixed',
              top: '60px',
              right: '40px',
              zIndex: 1000,
            }}
          >
            <button onClick={toggleTheme} style={buttonStyle}>
              Trocar tema
            </button>
          </div>
    
          {data?.items && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                marginTop: '20px',
              }}
            >
              {data.items.map((clan) => (
                <div key={clan.tag} style={cardStyle}>
                  <h3>{clan.name}</h3>
                  <p><strong>Tag:</strong> {clan.tag}</p>
                  <p><strong>Membros:</strong> {clan.members}/50</p>
                  <p><strong>Troféus:</strong> {clan.clanScore}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };
export default ProcurarClan;