import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../components/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function ClanMembers() {
  const { tag } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/clan/${tag}/members`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_CLASH_API_TOKEN}`
          }
        });
        setMembers(response.data.items);
      } catch (err) {
        console.error('Erro ao buscar membros do clã:', err.message);
        setError('Erro ao buscar membros do clã.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [tag]);

  if (loading) return <p>Carregando membros do clã...</p>;
  if (error) return <p>{error}</p>;

  const themeStyles = {
    backgroundColor: theme === 'light' ? '#f5f5f5' : '#121212',
    color: theme === 'light' ? '#000' : '#fff',
    minHeight: '100vh',
    padding: '30px',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={themeStyles}>
      <h2>Membros do Clã</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px',
          marginTop: '20px'
        }}
      >
        {members.map((member) => (
          <div
          onClick={() => navigate(`/player/${member.tag.replace('#', '')}`)}
            key={member.tag}
            style={{
              border: theme === 'light' ? '1px solid #000' : '1px solid #fff',
              borderRadius: '10px',
              padding: '15px'
            }}
          >
            <h3>{member.name}</h3>
            <p>Tag: {member.tag}</p>
            <p>Cargo: {member.role}</p>
            <p>Nível: {member.expLevel}</p>
            <p>Troféus: {member.trophies}</p>
            <p>Arena: {member.arena?.name}</p>
            <p>Doações: {member.donations}</p>
            <p>Recebidas: {member.donationsReceived}</p>
          </div>
        ))}
      </div>

      <Link
        to={`/clan/${tag}`}
        style={{
          display: 'inline-block',
          marginTop: '25px',
          backgroundColor: theme === 'light' ? '#000' : '#fff',
          color: theme === 'light' ? '#fff' : '#000',
          padding: '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none'
        }}
      >
        Voltar
      </Link>
    </div>
  );
}