import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NewspaperIcon from '@mui/icons-material/NewspaperOutlined';
import PaidIcon from '@mui/icons-material/PaidOutlined';
import ScienceIcon from '@mui/icons-material/ScienceOutlined';
import CloudIcon from '@mui/icons-material/CloudOutlined';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import GavelIcon from '@mui/icons-material/GavelOutlined';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import StockPriceWidget from './StockPriceWidget';

const Dashboard = () => {
  const [newsResult, setNewsResult] = useState(null);
  const [selectedStock, setSelectedStock] = useState('');
  const [buyOrSell, setBuyOrSell] = useState('Buy'); // Can be 'Buy' or 'Sell'
  const [stockAnalysis, setStockAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agentsDialogOpen, setAgentsDialogOpen] = useState(false);

  // Dynamically load agent names from card headings
  const agentHeadings = stockAnalysis && stockAnalysis.Dashboard
    ? Object.keys(stockAnalysis.Dashboard)
    : ['News', 'Financials', 'Chemical Prices', 'Climate', 'Social Sentiment', 'Regulatory'];

  // Reference links for each agent/card (customize as needed)
  const agentLinks = {
    News: 'https://github.com/your-org/NewsAgent',
    Financials: 'https://github.com/your-org/FinancialsAgent',
    'Chemical Prices': 'https://github.com/your-org/ChemicalPricesAgent',
    Climate: 'https://github.com/your-org/ClimateAgent',
    'Social Sentiment': 'https://github.com/your-org/SentimentAgent',
    Regulatory: 'https://github.com/your-org/RegulatoryAgent',
    NeuroSAN: 'https://github.com/your-org/neuro-san'
  };

  const usedAgents = agentHeadings.map(name => ({
    name: (stockAnalysis && stockAnalysis.Dashboard && stockAnalysis.Dashboard[name]?.Headline) || name,
    link: agentLinks[name] || '#'
  }));

  useEffect(() => {
    if (!selectedStock) {
      setNewsResult(null);
      return;
    }
    const API_URL = process.env.REACT_APP_API_URL || '';
    fetch(`${API_URL}/api/agent/news?symbol=${selectedStock}`)
      .then(res => res.json())
      .then(data => setNewsResult(data))
      .catch(() => setNewsResult({ headlines: ['Error fetching news'], summary: 'N/A' }));
  }, [selectedStock]);

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
    setStockAnalysis(null); // Reset analysis when stock changes
    setBuyOrSell('Buy'); // Reset recommendation
  };

  const handleGetInsights = async () => {
    if (!selectedStock) return;
    
    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      const response = await fetch(`${API_URL}/api/neurosan/stock-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stock: selectedStock
        })
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      if (!data.response || !data.response.text) {
        throw new Error('Invalid API response format');
      }
      let analysisData;
      if (typeof data.response.text === 'string') {
        console.log("String")
        analysisData = JSON.parse(data.response.text);
      } else {
        console.log("text")
        analysisData = data.response.text;
      }
      if (!analysisData.Dashboard || !analysisData.Actions || !analysisData.Actions[0]) {
        throw new Error('Invalid analysis data format');
      }
      setStockAnalysis(analysisData);
      setBuyOrSell(analysisData.Actions[0]);
    } catch (error) {
      console.error('Error fetching stock analysis:', error);
      setStockAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  // Card type to icon and color mapping
  const cardMeta = {
    News: {
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      icon: <NewspaperIcon sx={{ color: '#1976d2', fontSize: 36 }} />,
      color: 'linear-gradient(90deg,#e3f2fd,#fff)'
    },
    Financials: {
      image: 'https://cdn-icons-png.flaticon.com/512/1907/1907559.png',
      icon: <PaidIcon sx={{ color: '#388e3c', fontSize: 36 }} />,
      color: 'linear-gradient(90deg,#e8f5e9,#fff)'
    },
    'Chemical Prices': {
      image: 'https://cdn-icons-png.flaticon.com/512/2910/2910791.png',
      icon: <ScienceIcon sx={{ color: '#ff9800', fontSize: 36 }} />,
      color: 'linear-gradient(90deg,#fff3e0,#fff)'
    },
    Climate: {
      image: 'https://cdn-icons-png.flaticon.com/512/414/414974.png',
      icon: <CloudIcon sx={{ color: '#0288d1', fontSize: 36 }} />,
      color: 'linear-gradient(90deg,#e1f5fe,#fff)'
    },
    'Social Sentiment': {
      image: 'https://cdn-icons-png.flaticon.com/512/2583/2583346.png',
      icon: <EmojiEmotionsIcon sx={{ color: '#fbc02d', fontSize: 36 }} />,
      color: 'linear-gradient(90deg,#fffde7,#fff)'
    },
    Regulatory: {
      image: 'https://cdn-icons-png.flaticon.com/512/942/942748.png',
      icon: <GavelIcon sx={{ color: '#7b1fa2', fontSize: 36 }} />,
      color: 'linear-gradient(90deg,#f3e5f5,#fff)'
    },
  };


  // Fallback image for unknown types
  const fallbackImage = 'https://cdn-icons-png.flatiicon.com/512/565/565547.png';

  // Helper to normalize keys (lowercase, remove spaces/underscores)
  const normalizeKey = (str) => (str || '').toLowerCase().replace(/\s|_/g, '');

  // Helper to get cardMeta by normalized key
  const getCardMeta = (key) => {
    if (!key) return {};
    const nKey = normalizeKey(key);
    const found = Object.entries(cardMeta).find(([metaKey]) => normalizeKey(metaKey) === nKey);
    if (found) return found[1];
    return { image: fallbackImage };
  };


  // Helper to render icon or image in card header
  const renderCardVisual = (meta) => {
    if (meta && meta.image) {
      return <img src={meta.image} alt="card" style={{ width: 38, height: 38, objectFit: 'contain', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} />;
    }
    return meta && meta.icon ? meta.icon : null;
  };

  const renderDashboardCards = () => {
    const cardList = stockAnalysis && stockAnalysis.Dashboard
      ? Object.entries(stockAnalysis.Dashboard)
      : ['News', 'Financials', 'Chemical Prices', 'Climate', 'Social Sentiment', 'Regulatory'].map(title => [title, null]);

    // Helper to determine feedback color
    const getFeedbackColor = (text) => {
      if (!text) return undefined;
      const t = text.toLowerCase();
      if (/\b(positive|bullish|growth|increase|passed|success|up|gain|improve|surge|beat|profit|approve|expansion|good|stable|strong|record|optimistic|outperform|progress)\b|\+\d|\+\d+%/.test(t)) return '#388e3c';
      if (/\b(negative|bearish|decline|decrease|failed|delay|down|loss|drop|fall|miss|deficit|risk|recall|cut|weak|losses|concern|volatile|underperform|warning|problem)\b|\-\d|\-\d+%/.test(t)) return '#d32f2f';
      return undefined;
    };

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', mt: 2 }}>
        {cardList.map(([key, value]) => {
          const meta = getCardMeta(key);
          const summary = value?.Summary || (!stockAnalysis ? (!selectedStock ? 'Select a stock to view insights.' : 'Click "Get Insights" to analyze.') : 'No summary available');
          const feedbackColor = getFeedbackColor(summary);
          return (
            <Box key={key} sx={{ width: '33.33%', p: 1, boxSizing: 'border-box' }}>
              <Card
                sx={{
                  bgcolor: '#fff',
                  height: 260,
                  borderRadius: 3,
                  boxShadow: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'stretch',
                  transition: 'transform 0.18s, box-shadow 0.18s',
                  '&:hover': { boxShadow: 8, transform: 'translateY(-3px) scale(1.025)' },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1, p: 1.2, borderTopLeftRadius: 12, borderTopRightRadius: 12, background: meta.color || '#f5f5f5' }}>
                  {renderCardVisual(meta)}
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', textAlign: 'center', width: '100%' }}>{value?.Headline || key}</Typography>
                </Box>
                <CardContent sx={{ flex: 1, minHeight: 140, maxHeight: 140, overflowY: 'auto', p: 2 }}>
                  <Typography variant="body2" sx={{ fontSize: '1.08rem', lineHeight: 1.6, color: feedbackColor ? feedbackColor : 'text.secondary', wordBreak: 'break-all', overflowWrap: 'break-word', whiteSpace: 'pre-line', minWidth: 0 }}>
                    {summary}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>SynapseStocks Dashboard</Typography>
      <Typography variant="body1" gutterBottom sx={{ color: '#fff', fontSize: '1.35rem', fontWeight: 400 }}>
        View stock trends and <span style={{ fontWeight: 700, color: '#fff' }}>Agentic AI-driven</span> analytics and insights here.
      </Typography>
      <br />
      <br />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <Typography sx={{ minWidth: 100, fontWeight: 500 }}>Select Stock</Typography>
  <FormControl sx={{ minWidth: 180 }} size="small">
    <Select
      id="stock-select"
      value={selectedStock}
      onChange={handleStockChange}
      sx={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 2,
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: '#fff',
            borderRadius: 2,
          },
        },
      }}
    >
      <MenuItem value="">Select</MenuItem>
      <MenuItem value={'AAPL'}>Apple (AAPL)</MenuItem>
      <MenuItem value={'MSFT'}>Microsoft (MSFT)</MenuItem>
      <MenuItem value={'TSLA'}>Tesla (TSLA)</MenuItem>
      <MenuItem value={'JNJ'}>Johnson & Johnson (JNJ)</MenuItem>
      <MenuItem value={'PFE'}>Pfizer (PFE)</MenuItem>
      <MenuItem value={'XOM'}>Exxon Mobil (XOM)</MenuItem>
    </Select>
  </FormControl>
</Box>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          disabled={!selectedStock || loading}
          sx={{ borderRadius: (theme) => theme.shape.borderRadius, fontWeight: 600, px: 3, boxShadow: 2, minWidth: 130 }}
          onClick={handleGetInsights}
        >
          {loading ? <CircularProgress size={24} color="inherit" thickness={5} /> : 'Get Insights'}
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ borderRadius: (theme) => theme.shape.borderRadius, fontWeight: 600, px: 3, ml: 2, boxShadow: 2 }}
          onClick={() => setAgentsDialogOpen(true)}
        >
          Show My Agents
        </Button>
        <Dialog open={agentsDialogOpen} onClose={() => setAgentsDialogOpen(false)} maxWidth="xs" fullWidth
          PaperProps={{ sx: { bgcolor: '#fff', boxShadow: 24 } }}
        >
          <DialogTitle>Agents Used</DialogTitle>
          <DialogContent>
            <List>
              {usedAgents.map(agent => (
                <ListItem key={agent.name}>
                  <ListItemText
                    primary={agent.name}
                    secondary={<Link href={agent.link} target="_blank" rel="noopener">Reference</Link>}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAgentsDialogOpen(false)} color="primary" variant="contained">Close</Button>
          </DialogActions>
        </Dialog>

        {stockAnalysis && (
          <Button
            variant="contained"
            size="medium"
            sx={{
              ml: 2,
              fontSize: '1.1rem',
              fontWeight: 700,
              px: 3,
              height: 40,
              letterSpacing: 1,
              textTransform: 'uppercase',
              boxShadow: 2,
              bgcolor: buyOrSell === 'BUY' ? '#388e3c' : buyOrSell === 'SELL' ? '#d32f2f' : '#ff9800',
              '&:hover': {
                bgcolor: buyOrSell === 'BUY' ? '#2e7d32' : buyOrSell === 'SELL' ? '#c62828' : '#f57c00',
              }
            }}
            onClick={() => alert(`Action: ${buyOrSell} ${selectedStock}`)}
          >
            {buyOrSell}
          </Button>
        )}
        
        {!stockAnalysis && (
          <Chip
            label={selectedStock ? 'Analyze' : 'Select Stock'}
            sx={{
              ml: 2,
              fontSize: '1.1rem',
              fontWeight: 700,
              px: 2,
              height: 40,
              letterSpacing: 1,
              textTransform: 'uppercase',
              boxShadow: 2,
              bgcolor: '#fff',
              border: '1.5px solid',
              borderColor: '#e0e0e0',
              color: '#888',
            }}
            variant="filled"
          />
        )}

      </Box>
      
      {/* Stock Price Widget */}
      <Box sx={{ mb: 3, width: '100%' }}>
        <StockPriceWidget symbol={selectedStock} />
      </Box>
      
      {stockAnalysis && (
        <Box sx={{ mt: 2, mb: 1 }}>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
            Analysis for: {stockAnalysis?.Stock || selectedStock}. Below are the factors affecting the stock - LIVE.
          </Typography>
        </Box>
      )}
      
      {renderDashboardCards()}
    </>
  );
};

export default Dashboard;
