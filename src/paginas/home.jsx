import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Card from '../components/card.jsx';
import { ThemeContext } from '../components/ThemeContext';

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

  const { theme, toggleTheme } = useContext(ThemeContext);

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

  const themeStyles = {
    backgroundColor: theme === 'light' ? '#f5f5f5' : '#222',
    color: theme === 'dark' ? '#000' : '#fff',
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.3s ease',
  };

  return (
    <div
      style={{
        ...themeStyles, // aplica o tema atual
        minHeight: '100vh',
        minWidth: '196vh',
        backgroundColor: theme === 'light' ? '#f0f0f0' : '#121212',
        color: theme === 'light' ? '#000' : '#fff',
        padding: '30px',
      }}
    >
<div style={{ position: 'relative', padding: '25px' }}>
  <button
    style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'tomato',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      cursor: 'pointer',
    }}
    onClick={toggleTheme}
  >
    Trocar tema
  </button>

  <h1>SuperGuia do Clash Royale</h1>
</div>
  
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px',
          justifyItems: 'center',
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '10px',
              width: '180px',
              backgroundColor: theme === 'light' ? '#fff' : '#1f1f1f',
              boxShadow:
                theme === 'light'
                  ? '0 2px 6px rgba(0,0,0,0.1)'
                  : '0 2px 6px rgba(255,255,255,0.1)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Card
              card={card}
              nomesPTBR={nomesPTBR}
            />
          </div>
        ))}
      </div>
    </div>
  );

}

export default CardsList;