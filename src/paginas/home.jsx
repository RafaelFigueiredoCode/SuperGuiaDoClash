import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CardsList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const nomesPTBR = {
    "Knight": "Cavaleiro",
    "Archers": "Arqueiras",
    "Goblins": "Goblins",
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
    "Goblin Drill": "Escavadeira de Goblin",
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
    "Night Witch": "Bruxa Sombria",
    "Goblin Hut": "Cabana de Goblins",
    "Mini P.E.K.K.A": "Mini P.E.K.K.A",
    "Mortar": "Morteiro",
    "Sparky": "Sparky",
    "Inferno Tower": "Torre Inferno",
    "Graveyard": "Cemitério",
    "Cannon Cart": "Carrinho de Canhão",
    "Skeleton Barrel": "Barril de Esqueletos",
    "Tombstone": "Túmulo",
    "Giant Skeleton": "Esqueleto Gigante",
    "Battle Healer": "Curandeira",
    "Royal Hogs": "Porcos Reais",
    "Magic Archer": "Arqueiro Mágico",
    "Royal Delivery": "Entrega Real",
    "Elixir Collector": "Coletor de Elixir",
    "Clone": "Clone",
    "Freeze": "Gelo",
    "Rage": "Fúria",
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
    "Giant Snowball": "Bola de Neve",
    "Barbarian Hut": "Cabana de Bárbaros",
    "Goblin Gang": "Gangue de Goblins",
    "Fisherman": "Pescador",
    "Electro Spirit": "Espírito Elétrico",
    "Fire Spirit": "Espírito de Fogo",
    "Ice Spirit": "Espírito de Gelo",
    "Valkyrie": "Valquíria",
    "Bowler": "Lançador",
    'Hog Rider': 'Corredor',
    'Minion Horde': 'Horda de Servos',
    'Prince': 'Príncipe',
    'Dark Prince': 'Príncipe das Trevas',
    'Skeletons': 'Esqueletos',
    'Spear Goblins': 'Goblins Lanceiros',
    'Minions': 'Servos',
    'Balloon': 'Balão',
    'Ice Wizard': 'Mago de Gelo',
    'Guards': 'Guardas',
    'Three Musketeers': 'Três Mosqueteiras',
    'Miner': 'Mineiro',
    'Mega Minion': 'Megasservo',
    'Ice Golem': 'Golem de Gelo',
    'Elite Barbarians': 'Bárbaros de Elite',
    'Mega Knight': 'Megacavaleiro',
    'Zappies': 'Eletrocutadores',
    'Rascals': 'Recrutas',
    'Ram Rider': 'Domadora de Carneiro',
    'Flying Machine': 'Máquina Voadora',
    'Firecracker': 'Pirotécnica',
    'Mighty Miner': 'Mineiro Bombado',
    'Elixir Golem': 'Golem de Elixir',
    'Archer Queen': 'Rainha Arqueira',
    'Skeleton King': 'Rei Esqueleto',
    'Electro Giant': 'Gigante Elétrico',
    'Phoenix': 'Fenix',
    'Mother Witch': 'Bruxa Mãe',
    'Skeleton Dragons': 'Dragões Esqueletos',
    'The Log': 'O Tronco',
    'Monk': 'Monge',
    'Golden Knight': 'Cavaleiro Dourado',
    'Rune Giant': 'Gigante das Runas',
    'Suspicious Bush': 'Arbusto Traiçoeiro',
    'Goblin Machine': 'Máquina Goblin',
    'Little Prince': 'Pequeno Príncipe',
    'Boss Bandit': 'Bandida-líder',
    'Goblin Demolisher': 'Goblin Demolidor',
    'Bomb Tower': 'Torre de Bombas',
    'X-Bow': 'X-Besta',
    'Goblin Cage': 'Jaula de Goblin',
    'Mirror': 'Espelho',
    'Goblin Curse': 'Maldição Goblin',
    'Vines': 'Vinhas',
    'Heal Spirit': 'Espírito Curador',
    'Lightning': 'Relâmpago',
    'Void': 'Vácuo',
    'Spirit Empress': 'Imperatriz Espiritual'
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