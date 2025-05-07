import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
