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
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [newsResult, setNewsResult] = useState(null);
  const [selectedStock, setSelectedStock] = useState('');
  const [buyOrSell, setBuyOrSell] = useState('Buy'); // Can be 'Buy' or 'Sell'
  const [stockAnalysis, setStockAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

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
      
      const analysisData = JSON.parse(data.response.text);
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
    News: { icon: <NewspaperIcon sx={{ color: '#1976d2' }} />, color: 'linear-gradient(90deg,#e3f2fd,#fff)' },
    Financials: { icon: <PaidIcon sx={{ color: '#388e3c' }} />, color: 'linear-gradient(90deg,#e8f5e9,#fff)' },
    'Chemical Prices': { icon: <ScienceIcon sx={{ color: '#ff9800' }} />, color: 'linear-gradient(90deg,#fff3e0,#fff)' },
    Climate: { icon: <CloudIcon sx={{ color: '#0288d1' }} />, color: 'linear-gradient(90deg,#e1f5fe,#fff)' },
    'Social Sentiment': { icon: <EmojiEmotionsIcon sx={{ color: '#fbc02d' }} />, color: 'linear-gradient(90deg,#fffde7,#fff)' },
    Regulatory: { icon: <GavelIcon sx={{ color: '#7b1fa2' }} />, color: 'linear-gradient(90deg,#f3e5f5,#fff)' },
  };

  const renderDashboardCards = () => {
    if (!stockAnalysis || !stockAnalysis.Dashboard) {
      return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {['News', 'Financials', 'Chemical Prices', 'Climate', 'Social Sentiment', 'Regulatory'].map((title) => {
            const meta = cardMeta[title] || {};
            return (
              <Grid item xs={12} md={6} lg={4} key={title}>
                <Card
                  sx={{
                    bgcolor: '#fff',
                    minHeight: 220,
                    borderRadius: 3,
                    boxShadow: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'stretch',
                    transition: 'transform 0.18s, box-shadow 0.18s',
                    '&:hover': { boxShadow: 8, transform: 'translateY(-3px) scale(1.025)' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, p: 1.2, borderTopLeftRadius: 12, borderTopRightRadius: 12, background: meta.color || '#f5f5f5' }}>
                    {meta.icon}
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>{title}</Typography>
                  </Box>
                  <CardContent>
                    <Typography variant="body2" sx={{ color: '#b0b0b0', fontStyle: 'italic', textAlign: 'center' }}>
                      {!selectedStock ? 'Select a stock to view insights.' : 'Click "Get Insights" to analyze.'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      );
    }
    return (
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {Object.entries(stockAnalysis.Dashboard).map(([key, value]) => {
          const meta = cardMeta[key] || {};
          return (
            <Grid item xs={12} md={6} lg={4} key={key}>
              <Card
                sx={{
                  bgcolor: '#fff',
                  minHeight: 220,
                  borderRadius: 3,
                  boxShadow: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'stretch',
                  transition: 'transform 0.18s, box-shadow 0.18s',
                  '&:hover': { boxShadow: 8, transform: 'translateY(-3px) scale(1.025)' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, p: 1.2, borderTopLeftRadius: 12, borderTopRightRadius: 12, background: meta.color || '#f5f5f5' }}>
                  {meta.icon}
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>{value?.Headline || key}</Typography>
                </Box>
                <CardContent>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.08rem', lineHeight: 1.6 }}>
                    {value?.Summary || 'No summary available'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>SynapseStocks Dashboard</Typography>
<Typography variant="body1" gutterBottom>View stock trends and agent insights here.</Typography>
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
          sx={{ borderRadius: (theme) => theme.shape.borderRadius, fontWeight: 600, px: 3, boxShadow: 2 }}
          onClick={handleGetInsights}
        >
          {loading ? 'Analyzing...' : 'Get Insights'}
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ borderRadius: (theme) => theme.shape.borderRadius, fontWeight: 600, px: 3, ml: 2, boxShadow: 2 }}
          onClick={() => { /* TODO: Add show my agent logic */ }}
        >
          Show My Agents
        </Button>

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
      
      {stockAnalysis && (
        <Box sx={{ mt: 2, mb: 1 }}>
          <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>
            Analysis for: {stockAnalysis?.Stock || selectedStock}
          </Typography>
        </Box>
      )}
      
      {renderDashboardCards()}
    </>
  );
};

export default Dashboard;
