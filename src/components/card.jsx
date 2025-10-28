import { useNavigate } from 'react-router-dom';

export default function Card({ card, nomesPTBR, raridadesPTBR }) {
  const navigate = useNavigate();

  return (
    <div
    onClick={() => navigate(`/card/${card.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <p>{nomesPTBR[card.name] || card.name}</p>

      {card.iconUrls?.medium && (
        <img
          src={card.iconUrls.medium}
          alt={card.name}
          style={{ width: '100%', borderRadius: '4px' }}
        />
      )}

      <p>Raridade: {raridadesPTBR[card.rarity] || card.rarity}</p>
      <p>Elixir: {card.elixirCost ?? 'N/A'}</p>
    </div>
  );
}