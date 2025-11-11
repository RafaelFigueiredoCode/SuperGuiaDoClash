import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../components/ThemeContext';

export default function ClanDetails() {
  const { tag } = useParams();
  const [clan, setClan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const API_URL = 'https://superguiadoclash.onrender.com';


  useEffect(() => {
    const fetchClan = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/clan/${tag}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_CLASH_API_TOKEN}`
          }
        });
        setClan(response.data);
      } catch (err) {
        console.error('Erro ao buscar Clã:', err.message);
        setError('Erro ao buscar Clã.');
      } finally {
        setLoading(false);
      }
    };
    fetchClan();
  }, [tag]);

  if (loading) return <p>Carregando detalhes...</p>;
  if (error) return <p>{error}</p>;
  if (!clan) return <p>Clã não encontrado.</p>;
  
return (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', // centraliza verticalmente
      color: theme === 'light' ? '#000' : '#fff',
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#222',
      minHeight: '100vh',
      padding: '20px',
      position: 'relative', 
      transition: 'all 0.3s ease',
    }}
  >
    <button
      onClick={toggleTheme}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: 'tomato',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        fontWeight: 'bold',
      }}
    >
      Trocar tema
    </button>

    <div
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        padding: '40px',
        width: '90%',
        maxWidth: '600px',
        textAlign: 'center',
      }}
    >
      <h2 style={{ marginBottom: '10px' }}>{clan.name}</h2>
      <p><strong>Tag:</strong> {clan.tag}</p>
      <p><strong>Tipo:</strong> {clan.type}</p>
      <p><strong>Membros:</strong> {clan.members}/50</p>
      <p><strong>Troféus do Clã:</strong> {clan.clanScore}</p>
      <p style={{ marginTop: '15px' }}>
        <strong>Descrição:</strong><br />
        {clan.description || 'Sem descrição'}
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          flexWrap: 'wrap',
          marginTop: '25px',
        }}
      >
        <Link
          to={`/clan/${tag}/members`}
          style={{
            backgroundColor: theme === 'light' ? '#000' : '#fff',
            color: theme === 'light' ? '#fff' : '#000',
            padding: '10px 25px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Ver Membros
        </Link>

        <Link
          to="/procurar/clã"
          style={{
            backgroundColor: theme === 'light' ? '#000' : '#fff',
            color: theme === 'light' ? '#fff' : '#000',
            padding: '10px 25px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Voltar
        </Link>
      </div>
    </div>
  </div>
);


}