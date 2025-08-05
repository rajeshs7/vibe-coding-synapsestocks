import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import NewsAgent from './agents/NewsAgent.js';
import authRouter from './auth.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Auth endpoints
app.use('/api/auth', authRouter);

// Set up lowdb (shared instance)
import { db } from './db.js';

// Initialize DB with default structure if empty
await db.read();
if (!db.data) {
  db.data = { agents: [], users: [], results: [] };
  await db.write();
}

// Basic health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'SynapseStocks backend is running!' });
});

// Endpoint to run NewsAgent for a given stock symbol
app.get('/api/agent/news', async (req, res) => {
  const { symbol } = req.query;
  if (!symbol) {
    return res.status(400).json({ error: 'Missing stock symbol in query params.' });
  }
  const agent = new NewsAgent();
  const result = await agent.run(symbol);
  res.json(result);
});

// Proxy endpoint for NeuroSAN stock evaluator
app.post('/api/neurosan/stock-analysis', async (req, res) => {
  try {
    const { stock } = req.body;
    if (!stock) {
      return res.status(400).json({ error: 'Missing stock symbol' });
    }
    try {
      // Commented out the actual NeuroSAN API call for mock/demo purposes
      /*
      const response = await fetch('http://localhost:8080/api/v1/stock_evaluator/streaming_chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_message: {
            text: stock
          }
        })
      });
      const data = await response.json();
      res.json(data);
      */
      // Instead, read and return output.json using ES module imports
      const fs = await import('fs/promises');
      const path = await import('path');
      const { fileURLToPath } = await import('url');
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const outputPath = path.join(__dirname, 'output.json');
      const raw = await fs.readFile(outputPath, 'utf-8');
      const data = JSON.parse(raw);
      console.log(data);
      res.json(data);
    } catch (error) {
      console.error('NeuroSAN proxy error:', error);
      res.status(500).json({ error: 'Failed to fetch stock analysis' });
    }
  } catch (error) {
    console.error('NeuroSAN proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch stock analysis' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
