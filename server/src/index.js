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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
