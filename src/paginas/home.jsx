import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CardsList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const nomesPTBR = {
    "Knight": "Cavaleiro",
    "Archers": "Arqueiras",
    "Goblins": "Goblin",
    "Giant": "Gigante",
    "Bomber": "Bombardeiro",
    "Musketeer": "Mosqueteira",
    "Cannon": "Canhão",
    "Tesla": "Tesla",
    "Barbarians": "Bárbaros",
    "Royal Giant": "Gigante Real",
    "Royal Recruits": "Recrutas Reais",
    "Dart Goblin": "Goblin com Dardo",
    "Princess": "Princesa",
    "Battle Ram": "Aríete de Batalha",
    "Furnace": "Fornalha",
    "Wizard": "Mago",
    "Wall Breakers": "Destruidores de Muros",
    "Goblin Barrel": "Barril de Goblins",
    "Skeleton Army": "Exército de Esqueletos",
    "Baby Dragon": "Bebê Dragão",
    "Hunter": "Caçador",
    "Goblin Drill": "Broca de Goblin",
    "Witch": "Bruxa",
    "Electro Dragon": "Dragão Elétrico",
    "Executioner": "Executor",
    "Goblin Giant": "Goblin Gigante",
    "P.E.K.K.A": "P.E.K.K.A",
    "Royal Ghost": "Fantasma Real",
    "Inferno Dragon": "Dragão Infernal",
    "Lumberjack": "Lenhador",
    "Mega Knight": "Mega Cavaleiro",
    "Electro Wizard": "Mago Elétrico",
    "Bandit": "Bandida",
    "Zappies": "Zappies",
    "Bats": "Morcegos",
    "Night Witch": "Bruxa Noturna",
    "Lava Hound": "Cão de Lava",
    "Goblin Hut": "Cabana de Goblins",
    "Mini P.E.K.K.A": "Mini P.E.K.K.A",
    "Mortar": "Morteiro",
    "Sparky": "Sparky",
    "Inferno Tower": "Torre Inferno",
    "Graveyard": "Cemitério",
    "Cannon Cart": "Carrinho de Canhão",
    "Lightning": "Raio",
    "Skeleton Barrel": "Barril de Esqueletos",
    "Tombstone": "Túmulo",
    "Giant Skeleton": "Esqueleto Gigante",
    "Battle Healer": "Curandeira de Batalha",
    "Royal Hogs": "Porcos Reais",
    "Magic Archer": "Arqueiro Mágico",
    "Royal Delivery": "Entrega Real",
    "Elixir Collector": "Coletor de Elixir",
    "Clone": "Clone",
    "Freeze": "Congelar",
    "Rage": "Raiva",
    "Heal": "Cura",
    "Poison": "Veneno",
    "Earthquake": "Terremoto",
    "Tornado": "Tornado",
    "Fireball": "Bola de Fogo",
    "Zap": "Zap",
    "Arrows": "Setas",
    "Log": "Tronco",
    "Rocket": "Foguete",
    "Barbarian Barrel": "Barril de Bárbaros",
    "Giant Snowball": "Bola de Neve Gigante",
    "Barbarian Hut": "Cabana de Bárbaros",
    "Goblin Gang": "Gangue de Goblins",
    "Fisherman": "Pescador",
    "Electro Spirit": "Espírito Elétrico",
    "Fire Spirits": "Espíritos de Fogo",
    "Ice Spirit": "Espírito de Gelo",
    "Valkyrie": "Valquíria",
    "Bowler": "Bola de Rolamento"
  };

  const raridadesPTBR = {
    "common": "Comum",
    "rare": "Rara",
    "epic": "Épica",
    "legendary": "Lendária"
  };

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
<p>Nome: {nomesPTBR[card.name] || card.name}</p>
          {card.iconUrls?.medium && (
            <img
              src={card.iconUrls.medium}
              alt={card.name}
              style={{ width: '100%', borderRadius: '4px' }}
            />
          )}
<p>Raridade: {raridadesPTBR[card.rarity] || card.rarity}</p>
<p>Elixir: {card.elixirCost || 'N/A'}</p>
        </div>
      ))}
    </div>
  );
};

export default CardsList;