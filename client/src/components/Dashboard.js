import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [newsResult, setNewsResult] = useState(null);
  const [selectedStock, setSelectedStock] = useState('');
  const [buyOrSell, setBuyOrSell] = useState('Buy'); // Can be 'Buy' or 'Sell'

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
  };

  const handleGetInsights = () => {
    // Placeholder for future integration
    // Could trigger fetches or analytics based on selectedStock
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>SynapseStocks Dashboard</Typography>
      <Typography variant="body1" gutterBottom>View stock trends and agent insights here.</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <Typography sx={{ minWidth: 100, fontWeight: 500 }}>Pharmaceutical Stock</Typography>
  <FormControl sx={{ minWidth: 180 }} size="small">
    <Select
      id="pharma-stock-select"
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
      <MenuItem value={'PFE'}>Pfizer (PFE)</MenuItem>
      <MenuItem value={'MRK'}>Merck (MRK)</MenuItem>
      <MenuItem value={'JNJ'}>Johnson & Johnson (JNJ)</MenuItem>
      <MenuItem value={'NVS'}>Novartis (NVS)</MenuItem>
      <MenuItem value={'AZN'}>AstraZeneca (AZN)</MenuItem>
    </Select>
  </FormControl>
</Box>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ borderRadius: (theme) => theme.shape.borderRadius, fontWeight: 600, px: 3, boxShadow: 2 }}
          onClick={handleGetInsights}
        >
          Get Insights
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
        <Chip
          label={selectedStock ? buyOrSell : 'Buy/Sell'}
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
            color: !selectedStock ? '#888' : (buyOrSell === 'Buy' ? '#388e3c' : '#d32f2f'),
          }}
          variant="filled"
        />

      </Box>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* News Agent Card */}
        <Grid item xs={12} md={2} lg={2}>
          <Card sx={{ bgcolor: '#fff', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>News</Typography>
              {!selectedStock ? (
                <Typography variant="body2" sx={{ color: '#b0b0b0', fontStyle: 'italic', textAlign: 'center' }}>
                  Select a stock to view news.
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {newsResult ? (
                    <>
                      <b>Headline:</b> <span style={{color: '#388e3c'}}>{newsResult.headlines[0]}</span><br/>
                      <b>Summary:</b> <span style={{color: '#388e3c'}}>{newsResult.summary}</span>
                    </>
                  ) : (
                    <>Loading news...</>
                  )}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Financials Agent Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ bgcolor: '#fff', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
            <CardContent>
              <Typography variant="h6">Financials</Typography>
              {!selectedStock ? (
                <Typography variant="body2" sx={{ color: '#b0b0b0', fontStyle: 'italic', textAlign: 'center' }}>
                  Select a stock to view financials.
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  <b>Q2 Revenue:</b> <span style={{color: '#388e3c'}}>$2.1B (+12%)</span><br/>
                  <b>EPS:</b> <span style={{color: '#388e3c'}}>$1.34</span><br/>
                  <b>Forecast:</b> <span style={{color: '#388e3c'}}>Bullish</span>
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        {/* Chemical Prices Agent Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ bgcolor: '#fff', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
            <CardContent>
              <Typography variant="h6">Chemical Prices</Typography>
              {!selectedStock ? (
                <Typography variant="body2" sx={{ color: '#b0b0b0', fontStyle: 'italic', textAlign: 'center' }}>
                  Select a stock to view chemical prices.
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  <b>API Price:</b> <span style={{color: '#d32f2f'}}>$320/kg (↓ 5%)</span><br/>
                  <b>Solvent Cost:</b> <span style={{color: '#388e3c'}}>$45/drum (↑ 2%)</span>
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        {/* Climate Agent Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ bgcolor: '#fff', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
            <CardContent>
              <Typography variant="h6">Climate</Typography>
              {!selectedStock ? (
                <Typography variant="body2" sx={{ color: '#b0b0b0', fontStyle: 'italic', textAlign: 'center' }}>
                  Select a stock to view climate impact.
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  <b>Event:</b> Heavy rains in Andhra Pradesh<br/>
                  <b>Impact:</b> <span style={{color: '#d32f2f'}}>Minor delays in raw material delivery</span>
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        {/* Social Sentiment Agent Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ bgcolor: '#fff', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
            <CardContent>
              <Typography variant="h6">Social Sentiment</Typography>
              {!selectedStock ? (
                <Typography variant="body2" sx={{ color: '#b0b0b0', fontStyle: 'italic', textAlign: 'center' }}>
                  Select a stock to view social sentiment.
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  <b>Sentiment:</b> <span style={{color: '#388e3c'}}>62% Positive</span><br/>
                  <b>Trending:</b> #PharmaCorpSuccess
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        {/* Regulatory Agent Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ bgcolor: '#fff', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
            <CardContent>
              <Typography variant="h6">Regulatory</Typography>
              {!selectedStock ? (
                <Typography variant="body2" sx={{ color: '#b0b0b0', fontStyle: 'italic', textAlign: 'center' }}>
                  Select a stock to view regulatory updates.
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  <b>Recent:</b> <span style={{color: '#388e3c'}}>FDA inspection passed</span><br/>
                  <b>Upcoming:</b> <span style={{color: '#1976d2'}}>EMA review in August</span>
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
