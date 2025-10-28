import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function CardDetails() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
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
    const fetchCard = async () => {
      try {
        const response = await axios.get('/api/cards');
        const foundCard = response.data.items.find(c => c.id.toString() === id);
        setCard(foundCard || null);
      } catch (err) {
        console.error('Erro ao buscar carta:', err.message);
        setError('Erro ao buscar carta.');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  if (loading) return <p>Carregando detalhes...</p>;
  if (error) return <p>{error}</p>;
  if (!card) return <p>Carta não encontrada.</p>;

  return (
    <div
      style={{
        display: 'flex',          // ativa o flexbox
        flexDirection: 'column',  // empilha os elementos verticalmente
        justifyContent: 'center', // centraliza verticalmente
        alignItems: 'center',     // centraliza horizontalmente
        minHeight: '100vh',      // ocupa toda a altura da tela
        minWidth: '200vh',
        textAlign: 'center',      // mantém o texto centralizado
        padding: '20px',          // um pouco de espaço interno
        boxSizing: 'border-box',
      }}
    >
        <div
        style={{
        minWidth: '85vh',
        border: '1px solid black',
        borderRadius: '8px',
        paddingTop: '20px',
        paddingBottom: '20px'
    }}
        >

      <Link to="/">← Voltar</Link>
      <h1>{nomesPTBR[card.name] || card.name}</h1>
  
      {card.iconUrls?.medium && (
        <img
          src={card.iconUrls.medium}
          alt={card.name}
          style={{ width: '200px', margin: '20px 0' }}
        />
      )}
  
      <p><strong>Raridade: </strong> {raridadesPTBR[card.rarity] || card.rarity}</p>
      <p><strong>Tipo: </strong> {card.type}</p>
      <p><strong>Custo de Elixir:</strong> {card.elixirCost || 'N/A'}</p>
  
      {card.arena && <p><strong>Arena:</strong> {card.arena.name}</p>}
      {card.description && <p><strong>Descrição:</strong> {card.description}</p>}
  
      {card.stats && (
        <div style={{ textAlign: 'left', marginTop: '20px' }}>
          <h3>Stats:</h3>
          <ul>
            {Object.entries(card.stats).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
}