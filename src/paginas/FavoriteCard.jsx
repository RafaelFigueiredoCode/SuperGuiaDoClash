import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../components/ThemeContext';

export default function FavoriteCard() {
  const { tag } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const API_URL = 'https://superguiadoclash.onrender.com';

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/player/${tag}`);
        setPlayerData(response.data);
      } catch (err) {
        console.error('❌ Erro ao buscar Carta Favorita:', err.message);
        setError('Erro ao buscar Carta Favorita.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorite();
  }, [tag]);

  if (loading) return <p>Carregando Carta Favorita...</p>;
  if (error) return <p>{error}</p>;
  if (!playerData) return <p>Jogador não encontrado.</p>;

  const themeStyles = {
    backgroundColor: theme === 'light' ? '#f5f5f5' : '#121212',
    color: theme === 'light' ? '#000' : '#fff',
    minHeight: '100vh',
    padding: '30px',
    transition: 'all 0.3s ease',
  };

  return (
    <div
      style={{
        ...themeStyles,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <button
        onClick={toggleTheme}
        style={{
          alignSelf: 'flex-end',
          margin: '20px',
          cursor: 'pointer',
          backgroundColor: 'tomato',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          fontWeight: 'bold',
          transition: 'background 0.3s ease',
        }}
      >
        Trocar Tema
      </button>

      {playerData.currentFavouriteCard && (
        <div
          style={{
            backgroundColor: theme === 'light' ? '#eaeaea' : '#1f1f1f',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 6px 15px rgba(0,0,0,0.25)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            width: '350px',
            transform: 'scale(1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.25)';
          }}
        >
          <img
            src={
              playerData.currentFavouriteCard.iconUrls?.medium ||
              playerData.currentFavouriteCard.iconUrls?.large
            }
            alt={playerData.currentFavouriteCard.name}
            style={{
              width: '180px',
              height: '180px',
              objectFit: 'contain',
              marginBottom: '20px',
            }}
          />
          <h3
            style={{
              margin: '10px 0',
              fontSize: '22px',
              fontWeight: 'bold',
            }}
          >
            {playerData.currentFavouriteCard.name}
          </h3>
          <p style={{ fontSize: '16px', color: theme === 'light' ? '#555' : '#ccc' }}>
            💧 Custo de Elixir: {playerData.currentFavouriteCard.elixirCost}
          </p>
          <p style={{ fontSize: '16px', color: theme === 'light' ? '#555' : '#ccc' }}>
            🏆 Raridade: {playerData.currentFavouriteCard.rarity}
          </p>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link
          to={`/player/${tag}`}
          style={{
            display: 'inline-block',
            backgroundColor: theme === 'light' ? '#000' : '#fff',
            color: theme === 'light' ? '#fff' : '#000',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}

