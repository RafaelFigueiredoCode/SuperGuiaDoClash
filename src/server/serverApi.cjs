const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); 

const app = express();
app.use(cors());

app.get('/a', (req, res) => {
  res.json({ msg: 'Olá mundo' });
});

app.get('/api/cards', async (req, res) => {
  try {
    const response = await axios.get('https://api.clashroyale.com/v1/cards', {
      headers: { Authorization: `Bearer ${process.env.VITE_CLASH_API_TOKEN}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro na API Clash:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.response?.data?.message || error.message });
  }
});

app.get('/api/clans', async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios.get(
      `https://api.clashroyale.com/v1/clans?name=${encodeURIComponent(name)}&limit=10`,
      {
        headers: { Authorization: `Bearer ${process.env.VITE_CLASH_API_TOKEN}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro na rota /api/clans:', error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.get('/api/player/:tag', async (req, res) => {
  const tag = encodeURIComponent(req.params.tag.replace('#', ''));

  try {
    const response = await axios.get(
      `https://api.clashroyale.com/v1/players/%23${tag}`,
      {
        headers: { Authorization: `Bearer ${process.env.VITE_CLASH_API_TOKEN}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro na rota /api/player:', error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ API rodando em http://127.0.0.1:${PORT}`);
});