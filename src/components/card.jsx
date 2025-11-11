import { useNavigate } from 'react-router-dom';

export default function Card({ card, nomesPTBR }) {
  const navigate = useNavigate();

  return (
    <div
    onClick={() => navigate(`/card/${card.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <p style={{fontSize: '16px', fontWeight: 'bold'}}>{nomesPTBR[card.name] || card.name}</p>

      {card.iconUrls?.medium && (
        <img
          src={card.iconUrls.medium}
          alt={card.name}
          style={{ width: '100%', borderRadius: '4px' }}
        />
      )}
    </div>
  );
}