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

// Endpoint to get live stock price data
app.get('/api/stock/price', async (req, res) => {
  const { symbol } = req.query;
  if (!symbol) {
    return res.status(400).json({ error: 'Missing stock symbol in query params.' });
  }
  
  try {
    // Mock data for demonstration - replace with actual API call in production
    const mockPrices = {
      'PFE': { price: 28.45, change: +0.32, changePercent: +1.14, high: 28.67, low: 28.12, volume: 42150000 },
      'MRK': { price: 108.92, change: -1.23, changePercent: -1.12, high: 110.45, low: 108.20, volume: 8420000 },
      'JNJ': { price: 163.78, change: +2.14, changePercent: +1.32, high: 164.12, low: 162.45, volume: 6750000 },
      'NVS': { price: 102.34, change: -0.87, changePercent: -0.84, high: 103.21, low: 101.98, volume: 2340000 },
      'AZN': { price: 68.91, change: +1.45, changePercent: +2.15, high: 69.12, low: 67.89, volume: 5670000 },
      'AAPL': { price: 189.23, change: +3.45, changePercent: +1.86, high: 190.12, low: 187.34, volume: 58420000 },
      'MSFT': { price: 423.67, change: -2.18, changePercent: -0.51, high: 426.89, low: 422.15, volume: 22340000 },
      'TSLA': { price: 267.89, change: +12.34, changePercent: +4.83, high: 269.45, low: 255.67, volume: 87650000 },
      'XOM': { price: 112.45, change: +0.78, changePercent: +0.70, high: 113.12, low: 111.89, volume: 18720000 }
    };
    
    const stockData = mockPrices[symbol] || {
      price: 0,
      change: 0,
      changePercent: 0,
      high: 0,
      low: 0,
      volume: 0
    };
    
    // Add timestamp for "live" feel and slight random variation
    const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
    const adjustedPrice = stockData.price * (1 + variation);
    const adjustedChange = stockData.change + variation * stockData.price;
    const adjustedChangePercent = (adjustedChange / (adjustedPrice - adjustedChange)) * 100;
    
    res.json({
      symbol,
      price: Math.max(0.01, adjustedPrice),
      change: adjustedChange,
      changePercent: adjustedChangePercent,
      high: Math.max(adjustedPrice, stockData.high),
      low: Math.min(adjustedPrice, stockData.low),
      volume: stockData.volume,
      timestamp: new Date().toISOString(),
      currency: 'USD'
    });
    
  } catch (error) {
    console.error('Stock price fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch stock price data' });
  }
});

// Proxy endpoint for NeuroSAN stock evaluator
app.post('/api/neurosan/stock-analysis', async (req, res) => {
  try {
    const { stock } = req.body;
    if (!stock) {
      return res.status(400).json({ error: 'Missing stock symbol' });
    }

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
  } catch (error) {
    console.error('NeuroSAN proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch stock analysis' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
