import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [newsResult, setNewsResult] = useState(null);
  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || '';
    fetch(`${API_URL}/api/agent/news?symbol=PFE`)
      .then(res => res.json())
      .then(data => setNewsResult(data))
      .catch(() => setNewsResult({ headlines: ['Error fetching news'], summary: 'N/A' }));
  }, []);

  return (
    <>

      <Typography variant="h4" gutterBottom>SynapseStocks Dashboard</Typography>
      <Typography variant="body1" gutterBottom>View stock trends and agent insights here.</Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* News Agent Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">News</Typography>
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
            </CardContent>
          </Card>
        </Grid>
        {/* Financials Agent Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Financials</Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Q2 Revenue:</b> <span style={{color: '#388e3c'}}>$2.1B (+12%)</span><br/>
                <b>EPS:</b> <span style={{color: '#388e3c'}}>$1.34</span><br/>
                <b>Forecast:</b> <span style={{color: '#388e3c'}}>Bullish</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Chemical Prices Agent Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Chemical Prices</Typography>
              <Typography variant="body2" color="text.secondary">
                <b>API Price:</b> <span style={{color: '#d32f2f'}}>$320/kg (↓ 5%)</span><br/>
                <b>Solvent Cost:</b> <span style={{color: '#388e3c'}}>$45/drum (↑ 2%)</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Climate Agent Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Climate</Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Event:</b> Heavy rains in Andhra Pradesh<br/>
                <b>Impact:</b> <span style={{color: '#d32f2f'}}>Minor delays in raw material delivery</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Social Sentiment Agent Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Social Sentiment</Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Sentiment:</b> <span style={{color: '#388e3c'}}>62% Positive</span><br/>
                <b>Trending:</b> #PharmaCorpSuccess
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Regulatory Agent Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Regulatory</Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Recent:</b> <span style={{color: '#388e3c'}}>FDA inspection passed</span><br/>
                <b>Upcoming:</b> <span style={{color: '#1976d2'}}>EMA review in August</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
