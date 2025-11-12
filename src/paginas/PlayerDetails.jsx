import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../components/ThemeContext";

export default function PlayerDetails() {
  const { tag } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/player/${tag}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_CLASH_API_TOKEN}`,
            },
          }
        );
        setPlayer(response.data);
      } catch (err) {
        console.error("Erro ao buscar Player:", err.message);
        setError("Erro ao buscar Player.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [tag]);

  if (loading) return <p>Carregando detalhes...</p>;
  if (error) return <p>{error}</p>;
  if (!player) return <p>Player não encontrado.</p>;

  const winRate =
    player.battleCount > 0
      ? ((player.wins / player.battleCount) * 100).toFixed(2)
      : 0;

  const threeCrownRate =
    player.wins > 0
      ? ((player.threeCrownWins / player.wins) * 100).toFixed(2)
      : 0;

  const themeStyles = {
    backgroundColor: theme === "light" ? "#f5f5f5" : "#222",
    color: theme === "light" ? "#000" : "#fff",
    minHeight: "100vh",
    padding: "20px",
    transition: "all 0.3s ease",
  };

  const buttonStyle = {
    backgroundColor: theme === "light" ? "#000" : "#fff",
    color: theme === "light" ? "#fff" : "#000",
    padding: "10px 15px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    width: "160px",
    textAlign: "center",
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

      <div
        style={{
          border: theme === "light" ? "2px solid #000" : "2px solid #fff",
          borderRadius: "15px",
          padding: "20px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <h2>{player.name}</h2>
        <p>Tag: {player.tag}</p>
        <p>Nível: {player.expLevel}</p>
        <p>Troféus: {player.trophies}</p>
        <p>Melhor pontuação: {player.bestTrophies}</p>
        <p>Batalhas jogadas: {player.battleCount}</p>
        <p>Vitórias: {player.wins}</p>
        <p>Derrotas: {player.losses}</p>
        <p>Vitórias com 3 coroas: {player.threeCrownWins}</p>
        <hr style={{ margin: "15px 0", opacity: 0.3 }} />
        <h3>📊 Estatísticas</h3>
        <p>
          Taxa de vitória: <strong>{winRate}%</strong>
        </p>
        <p>
          Vitórias com 3 coroas: <strong>{threeCrownRate}% das vitórias</strong>
        </p>
        <hr style={{ margin: "15px 0", opacity: 0.3 }} />
        <p>Clã: {player.clan?.name || "Sem clã"}</p>
        <p>Arena: {player.arena?.name}</p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <Link to={`/player/${tag}/badges`} style={buttonStyle}>
            Ver Conquistas
          </Link>

          <Link to={`/player/${tag}/favoriteCard`} style={buttonStyle}>
            Ver Carta Favorita
          </Link>

          <Link to={`/player/${tag}/battleLog`} style={buttonStyle}>
            Ver Histórico de Batalha
          </Link>

          {player.clan && (
            <Link
              to={`/clan/${encodeURIComponent(
                player.clan.tag.replace("#", "")
              )}`}
              style={{
                ...buttonStyle,
                backgroundColor: theme === "light" ? "#007bff" : "#fff",
              }}
            >
              Ver detalhes do Clã : {player.clan.name}
            </Link>
          )}

          <Link to="/procurar/player" style={buttonStyle}>
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
