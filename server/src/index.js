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

// Stock price endpoint with mock data
app.get('/api/stock/price', (req, res) => {
  const { symbol } = req.query;
  if (!symbol) {
    return res.status(400).json({ error: 'Missing stock symbol in query params.' });
  }

  // Mock stock data for the requested stocks
  const mockStockData = {
    AAPL: { price: 182.52, change: 1.35, changePercent: 0.74, high: 184.12, low: 180.89, volume: 45234567 },
    MSFT: { price: 378.85, change: -2.15, changePercent: -0.56, high: 382.45, low: 376.23, volume: 28756432 },
    TSLA: { price: 248.42, change: 4.87, changePercent: 1.99, high: 251.78, low: 243.56, volume: 67832145 },
    JNJ: { price: 158.73, change: 0.92, changePercent: 0.58, high: 159.84, low: 157.12, volume: 12456789 },
    PFE: { price: 28.94, change: -0.34, changePercent: -1.16, high: 29.45, low: 28.67, volume: 34567891 },
    XOM: { price: 104.67, change: 2.13, changePercent: 2.08, high: 105.92, low: 102.34, volume: 23789456 }
  };

  const stockData = mockStockData[symbol.toUpperCase()];
  if (!stockData) {
    return res.status(404).json({ error: `Stock symbol ${symbol} not found in mock data.` });
  }

  // Add some randomization to make it feel "live"
  const randomizedData = {
    symbol: symbol.toUpperCase(),
    price: +(stockData.price + (Math.random() - 0.5) * 2).toFixed(2),
    change: +(stockData.change + (Math.random() - 0.5) * 0.5).toFixed(2),
    changePercent: +(stockData.changePercent + (Math.random() - 0.5) * 0.2).toFixed(2),
    high: +(stockData.high + (Math.random() - 0.5) * 1).toFixed(2),
    low: +(stockData.low + (Math.random() - 0.5) * 1).toFixed(2),
    volume: Math.floor(stockData.volume + (Math.random() - 0.5) * stockData.volume * 0.1),
    timestamp: new Date().toISOString()
  };

  res.json(randomizedData);
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
      console.log(data);
      res.json(data);
      // Instead, read and return output.json using ES module imports
      //const fs = await import('fs/promises');
      // const path = await import('path');
      // const { fileURLToPath } = await import('url');
      // const __dirname = path.dirname(fileURLToPath(import.meta.url));
      // const outputPath = path.join(__dirname, 'output.json');
      // const raw = await fs.readFile(outputPath, 'utf-8');
      // const data = JSON.parse(raw);
      // console.log(data);
      // res.json(data);
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
