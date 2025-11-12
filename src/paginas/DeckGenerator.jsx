import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";
import useFetch from "../components/useFetch.jsx";

export default function DeckGenerator() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: cards, error, loading } = useFetch("/api/cards");
  const [deck, setDeck] = useState([]);
  const [rarityFilter, setRarityFilter] = useState("all");
  const [elixirFilter, setElixirFilter] = useState("Custo Aleatório");

  const themeStyles = {
    backgroundColor: theme === "light" ? "#f5f5f5" : "#222",
    color: theme === "light" ? "#000" : "#fff",
    minHeight: "100vh",
    padding: "20px",
    transition: "all 0.3s ease",
  };

  const generateDeck = () => {
    if (!cards || !cards.items) return;

    let filtered = [...cards.items];

    if (rarityFilter !== "all") {
      filtered = filtered.filter(
        (c) => c.rarity?.toLowerCase() === rarityFilter.toLowerCase()
      );
    }

    if (elixirFilter !== "Custo Aleatório") {
      filtered = filtered.filter(
        (c) => String(c.elixirCost) === String(elixirFilter)
      );
    }

    if (filtered.length < 8) {
      alert("Poucas cartas disponíveis com esses filtros!");
      console.log(
        "🧩 Cartas filtradas:",
        filtered.map((c) => `${c.name} (${c.elixirCost})`)
      );
      return;
    }

    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const randomDeck = shuffled.slice(0, 8);
    setDeck(randomDeck);
  };

  useEffect(() => {
    if (cards && cards.items?.length > 0) {
      generateDeck();
    }
  }, [cards]);

  if (loading) return <p>Carregando cartas...</p>;
  if (error) return <p>Erro ao carregar cartas: {error.message}</p>;

  return (
    <div style={themeStyles}>
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: theme === "light" ? "#000" : "#fff",
          color: theme === "light" ? "#fff" : "#000",
          borderRadius: "8px",
          padding: "10px 15px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Trocar Tema
      </button>

      <h1>🎴 Gerador de Deck Aleatório</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        <select
          value={rarityFilter}
          onChange={(e) => setRarityFilter(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid gray",
          }}
        >
          <option value="all">Todas Raridades</option>
          <option value="Common">Comum</option>
          <option value="Rare">Rara</option>
          <option value="Epic">Épica</option>
          <option value="Legendary">Lendária</option>
        </select>
        <select
          value={elixirFilter}
          onChange={(e) => setElixirFilter(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid gray",
          }}
        >
          <option value="Custo Aleatório">Custo Aleatório</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>

      <button
        onClick={generateDeck}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        🔁 Gerar Novo Deck
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "15px",
          marginTop: "30px",
        }}
      >
        {deck.map((card) => (
          <div
            key={card.id}
            style={{
              backgroundColor: theme === "light" ? "#fff" : "#333",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={card.iconUrls?.medium}
              alt={card.name}
              style={{ width: "150px", height: "200px", borderRadius: "10px" }}
            />
            <h4>{card.name}</h4>
            <p>Elixir: {card.elixirCost}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
