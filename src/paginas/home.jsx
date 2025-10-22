import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CardsList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('/api/cards'); 
        console.log('Cartas:', response.data.items); 
        setCards(response.data.items || []);
      } catch (err) {
        console.error('Erro ao buscar cartas:', err.message);
        setError('Erro ao buscar cartas.');
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) return <p>Carregando cartas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {cards.map((card) => (
        <div
          key={card.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            width: '180px',
            textAlign: 'center',
            backgroundColor: '#f8f8f8',
          }}
        >
          <h4>{card.name}</h4>
          {card.iconUrls?.medium && (
            <img
              src={card.iconUrls.medium}
              alt={card.name}
              style={{ width: '100%', borderRadius: '4px' }}
            />
          )}
          <p>Elixir: {card.elixirCost ?? 'N/A'}</p>
          <p>Raridade: {card.rarity}</p>
        </div>
      ))}
    </div>
  );
};

export default CardsList;