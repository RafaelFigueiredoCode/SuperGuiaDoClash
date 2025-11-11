import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../components/ThemeContext';

export default function PlayerBadges() {
  const { tag } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);
  const API_URL = 'https://superguiadoclash.up.railway.app'

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/player/${tag}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_CLASH_API_TOKEN}`,
          },
        });
        setPlayerData(response.data);
      } catch (err) {
        console.error('Erro ao buscar Conquista:', err.message);
        setError('Erro ao buscar Conquista.');
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [tag]);

  if (loading) return <p>Carregando conquistas...</p>;
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
    <div style={themeStyles}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        🏅 Conquistas de {playerData.name}
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          justifyItems: 'center',
        }}
      >
        {playerData.badges?.map((badge, index) => (
          <div
            key={index}
            style={{
              backgroundColor: theme === 'light' ? '#eaeaea' : '#1f1f1f',
              borderRadius: '12px',
              padding: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s',
            }}
          >
            <img
            src={
            badge.iconUrls?.medium ||
            badge.iconUrls?.large
          }
              alt={badge.name}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain',
                marginBottom: '10px',
              }}
            />
            <h3 style={{ margin: '5px 0', fontSize: '14px' }}>
              {badge.name.replace('Mastery', '').replace(/([A-Z])/g, ' $1')}
            </h3>
            <p style={{ fontSize: '12px', color: '#aaa' }}>
              Nível {badge.level} / {badge.maxLevel}
            </p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link
          to={`/player/${tag}`}
          style={{
            color: '#00bfff',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          ← Voltar ao perfil
        </Link>
      </div>
    </div>
  );
}