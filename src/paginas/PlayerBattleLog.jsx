import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../components/ThemeContext";

export default function PlayerBattleLog() {
  const { tag } = useParams();
  const [battleLog, setBattleLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchBattleLog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/player/${tag}/battlelog`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_CLASH_API_TOKEN}`,
            },
          }
        );
        setBattleLog(response.data);
      } catch (err) {
        console.error("Erro ao buscar Histórico de Batalha:", err.message);
        setError("Erro ao buscar Histórico de Batalha.");
      } finally {
        setLoading(false);
      }
    };

    fetchBattleLog();
  }, [tag]);

  if (loading) return <p>Carregando Histórico de Batalha...</p>;
  if (error) return <p>{error}</p>;
  if (!battleLog || battleLog.length === 0)
    return <p>Nenhuma batalha encontrada.</p>;

  const themeStyles = {
    backgroundColor: theme === "light" ? "#f5f5f5" : "#121212",
    color: theme === "light" ? "#000" : "#fff",
    minHeight: "100vh",
    padding: "30px",
    transition: "all 0.3s ease",
  };

  return (
    <div style={themeStyles}>
      <button
        onClick={toggleTheme}
        style={{
          marginBottom: "20px",
          marginLeft: "1580px",
          cursor: "pointer",
          backgroundColor: "tomato",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 15px",
        }}
      >
        Trocar Tema
      </button>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        ⚔️ Histórico de Batalhas
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {battleLog.map((battle, index) => {
          const player = battle.team?.[0];
          const opponent = battle.opponent?.[0];
          const result =
            player.crowns > opponent.crowns
              ? "Vitória 🏆"
              : player.crowns < opponent.crowns
              ? "Derrota 💀"
              : "Empate ⚖️";

          const trophyChange =
            battle.trophyChange !== undefined
              ? battle.trophyChange > 0
                ? `+${battle.trophyChange}`
                : `${battle.trophyChange}`
              : "—";

          return (
            <div
              key={index}
              style={{
                border: theme === "light" ? "2px solid #000" : "2px solid #fff",
                borderRadius: "12px",
                padding: "15px",
                backgroundColor: theme === "light" ? "#fff" : "#1e1e1e",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                transition: "transform 0.2s",
              }}
            >
              <h3 style={{ marginBottom: "8px" }}>{battle.gameMode?.name}</h3>
              <p>
                <strong>Resultado:</strong> {result}
              </p>
              <p>
                <strong>Oponente:</strong> {opponent.name} ({opponent.tag})
              </p>
              <p>
                <strong>Troféus:</strong> {trophyChange}
              </p>
              <p>
                <strong>Coroas:</strong> {player.crowns} x {opponent.crowns}
              </p>

              <div style={{ marginTop: "10px" }}>
                <strong>Deck usado:</strong>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "8px",
                  }}
                >
                  {player.cards.map((card, idx) => (
                    <img
                      key={idx}
                      src={card.iconUrls.medium}
                      alt={card.name}
                      title={card.name}
                      style={{
                        width: "80px",
                        height: "100px",
                        borderRadius: "8px",
                        border: "1px solid gray",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link
          to={`/player/${tag}`}
          style={{
            display: "inline-block",
            backgroundColor: theme === "light" ? "#000" : "#fff",
            color: theme === "light" ? "#fff" : "#000",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            position: "fixed",
            bottom: "20px",
            right: "830px",
            zIndex: 1000,
          }}
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}
