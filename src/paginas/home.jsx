import React, { useContext } from "react";
import Card from "../components/card.jsx";
import { ThemeContext } from "../components/ThemeContext";
import useFetch from "../components/useFetch.jsx";
import { useNavigate } from "react-router-dom";
import {nomesPTBR} from '../components/NomesPTBR.jsx'


const CardsList = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const { data: cards, error, loading } = useFetch("api/cards");

  if (loading) return <p>Carregando cartas...</p>;
  if (error) return <p>{error}</p>;

  const themeStyles = {
    backgroundColor: theme === "light" ? "#f5f5f5" : "#222",
    color: theme === "dark" ? "#000" : "#fff",
    minHeight: "100vh",
    padding: "20px",
    transition: "all 0.3s ease",
  };

  return (
    <div
      style={{
        ...themeStyles,
        minHeight: "100vh",
        minWidth: "100vh",
        backgroundColor: theme === "light" ? "#f0f0f0" : "#121212",
        color: theme === "light" ? "#000" : "#fff",
        padding: "30px",
      }}
    >
      <div style={{ position: "relative", padding: "25px" }}>
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "tomato",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
          onClick={toggleTheme}
        >
          Trocar tema
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <h1>SuperGuia do Clash Royale</h1>
          <button
            style={{
              backgroundColor: "tomato",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              cursor: "pointer",
              marginRight: "5px",
            }}
            onClick={() => navigate("/procurar/clã")}
          >
            Procurar Clã
          </button>
          <button
            style={{
              backgroundColor: "tomato",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              cursor: "pointer",
              marginRight: "7px",
            }}
            onClick={() => navigate("/procurar/player")}
          >
            Procurar Jogador
          </button>
          <button
            style={{
              backgroundColor: "tomato",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              cursor: "pointer",
              marginRight: "5px",
            }}
            onClick={() => navigate("/locations/:locationId/rankings/players")}
          >
            Ver Ranking dos Países
          </button>
          <button
            style={{
              backgroundColor: "tomato",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              cursor: "pointer",
              marginRight: "5px",
            }}
            onClick={() => navigate("/deckGenerator")}
          >
            Gerar Deck Aleatório
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          justifyItems: "center",
        }}
      >
        {(cards.items || []).map((card) => (
          <div
            key={card.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              width: "180px",
              backgroundColor: theme === "light" ? "#fff" : "#1f1f1f",
              boxShadow:
                theme === "light"
                  ? "0 2px 6px rgba(0,0,0,0.1)"
                  : "0 2px 6px rgba(255,255,255,0.1)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Card card={card} nomesPTBR={nomesPTBR} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsList;
