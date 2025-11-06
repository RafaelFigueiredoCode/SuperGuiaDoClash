import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../components/ThemeContext';

export default function PlayerDetails(){
    const {tag} = useParams()
    const [player, setPlayer] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { theme, toggleTheme } = useContext(ThemeContext);
 
    useEffect(() => {
        const fetchPlayer = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/api/player/${tag}`, {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_CLASH_API_TOKEN}`
              }
            });
            setPlayer(response.data);
          } catch (err) {
            console.error('Erro ao buscar Player:', err.message);
            setError('Erro ao buscar Player.');
          } finally {
            setLoading(false);
          }
        };
        fetchPlayer();
    }, [tag]);
  

      if (loading) return <p>Carregando detalhes...</p>;
      if (error) return <p>{error}</p>;
      if (!player) return <p>Player não encontrado.</p>;

      const themeStyles = {
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#222',
        color: theme === 'light' ? '#000' : '#fff',
        minHeight: '100vh',
        padding: '20px',
        transition: 'all 0.3s ease',
        border: theme === 'light' ? '#000' : '#fff',
      };

      return (
        <div style={themeStyles}>
          <button onClick={toggleTheme} style={{ marginBottom: '20px' }}>
            Alternar Tema
          </button>
    
          <div style={{
            border: theme === 'light' ? '2px solid #000' : '2px solid #fff',
            borderRadius: '15px',
            padding: '20px',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <h2>{player.name}</h2>
            <p>Tag: {player.tag}</p>
            <p>Nível: {player.expLevel}</p>
            <p>Troféus: {player.trophies}</p>
            <p>Melhor pontuação: {player.bestTrophies}</p>
            <p>Vitórias: {player.wins}</p>
            <p>Derrotas: {player.losses}</p>
            <p>3 coroas: {player.threeCrownWins}</p>
            <p>Clã: {player.clan?.name || 'Sem clã'}</p>
            <p>Arena: {player.arena?.name}</p>

            
            <Link to={'/procurar/player'} style={{
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
            <Link to={`/player/${tag}/badges`} style={{
              display: 'inline-block',
              marginTop: '15px',
              backgroundColor: theme === 'light' ? '#000' : '#fff',
              color: theme === 'light' ? '#fff' : '#000',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              marginLeft: '20px'
            }}>
              Ver Conquistas
            </Link>
          </div>
        </div>
      );
}