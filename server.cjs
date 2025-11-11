const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); 

const app = express();
app.use(cors());

// 🔹 Teste rápido
app.get('/a', (req, res) => {
  res.json({ msg: 'Olá mundo' });
});

// 🔹 Buscar todas as cartas
app.get('/api/cards', async (req, res) => {
  try {
    const response = await axios.get('https://api.clashroyale.com/v1/cards', {
      headers: { Authorization: `Bearer ${process.env.CLASH_API_TOKEN}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro na API Clash:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.response?.data?.message || error.message });
  }
});

// 🔹 Buscar clãs por nome
app.get('/api/clans', async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios.get(
      `https://api.clashroyale.com/v1/clans?name=${encodeURIComponent(name)}&limit=10`,
      { headers: { Authorization: `Bearer ${process.env.CLASH_API_TOKEN}` } }
    );
    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro na rota /api/clans:', error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// 🔹 Buscar detalhes de um clã
app.get('/api/clan/:tag', async (req, res) => {
  const { tag } = req.params;
  try {
    const response = await axios.get(
      `https://api.clashroyale.com/v1/clans/%23${tag}`,
      { headers: { Authorization: `Bearer ${process.env.CLASH_API_TOKEN}` } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Buscar membros do clã
app.get('/api/clan/:tag/members', async (req, res) => {
  const { tag } = req.params;
  try {
    const response = await axios.get(
      `https://api.clashroyale.com/v1/clans/%23${tag}/members`,
      { headers: { Authorization: `Bearer ${process.env.CLASH_API_TOKEN}` } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Buscar informações do jogador
app.get('/api/player/:tag', async (req, res) => {
  const tag = encodeURIComponent(req.params.tag.replace('#', ''));
  try {
    const response = await axios.get(
      `https://api.clashroyale.com/v1/players/%23${tag}`,
      { headers: { Authorization: `Bearer ${process.env.CLASH_API_TOKEN}` } }
    );
    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro na rota /api/player:', error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// 🔹 Buscar histórico de batalhas do jogador
app.get('/api/player/:tag/battlelog', async (req, res) => {
  const { tag } = req.params;
  try {
    const response = await axios.get(
      `https://api.clashroyale.com/v1/players/%23${tag}/battlelog`,
      { headers: { Authorization: `Bearer ${process.env.CLASH_API_TOKEN}` } }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Erro ao buscar Battlelog:', err.response?.data || err.message);
    res.status(500).json({ error: 'Erro ao buscar histórico de batalhas.' });
  }
});

// 🔹 Buscar localizações
app.get('/api/locations', async (req, res) => {
  try {
    const response = await axios.get('https://api.clashroyale.com/v1/locations', {
      headers: { Authorization: `Bearer ${process.env.CLASH_API_TOKEN}` },
    });
    res.json(response.data);
  } catch (err) {
    console.error("❌ Erro ao buscar localizações:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ error: err.response?.data || err.message });
  }
});

// 🔹 Buscar ranking por localização
app.get('/api/locations/:locationId/rankings/players', async (req, res) => {
  const { locationId } = req.params;
  const limit = req.query.limit || 50;

  console.log("📦 locationId recebido:", locationId);

  try {
    const url = `https://api.clashroyale.com/v1/locations/${locationId}/rankings/players?limit=${limit}`;
    console.log("🌍 Buscando:", url);
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${process.env.CLASH_API_TOKEN}` },
    });

    console.log("✅ Itens recebidos:", response.data.items?.length);
    res.json(response.data);
  } catch (err) {
    console.error("❌ Erro ao buscar ranking:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ error: err.response?.data || err.message });
  }
});

// 🔹 Porta dinâmica (Render usa variável PORT)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});