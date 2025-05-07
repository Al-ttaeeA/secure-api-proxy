import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Proxy is running!');
});

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://your-real-api.com/data', {
      headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'API call failed' });
  }
});

app.post('/api/gemini', async (req, res) => {
  const { prompt } = req.body;

  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.json(geminiRes.data);
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch Gemini response." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
