const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());


const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImVkNTZkZDM0LTg4YzQtNDc4MC1hMDU1LWZmM2JlZDcyMGY0ZSIsImlhdCI6MTc2MTY1MTA0NCwic3ViIjoiZGV2ZWxvcGVyL2QzNjZiZDI2LTllY2UtMGE5Zi00MGYwLTE2YmE0MjMwZGVjYyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxODkuOC4yMDUuMjYiXSwidHlwZSI6ImNsaWVudCJ9XX0.9nqnwe84CVrMgutSc9x3Ch6BFeCfwQJrUFCdYtCbtnXS8smsbZ0sh1F0lVy5EW7U0fwa1Pu6uA12uz4e2cJ1PQ';
app.get('/a', (req,res)=>{
  res.json({"msg":"Ola mundo"})
}

)
app.get('/api/cards', async (req, res) => {
  try {
    const response = await axios.get('https://api.clashroyale.com/v1/cards', {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro na API Clash:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.response?.data?.message || error.message });
  }
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ API rodando em http://127.0.0.1:${PORT}`);
});