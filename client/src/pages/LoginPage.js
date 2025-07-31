import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';
import StockImage from '../assets/stock-bg.jpg'; // Add your own relevant image here

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const API_URL = process.env.REACT_APP_API_URL || '';
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left: Image (desktop only) */}
      <Grid item md={6} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', p: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <img
            src={StockImage}
            alt="Stock Market"
            style={{
              maxWidth: '80%',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: 16,
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
            }}
          />
        </Box>
      </Grid>
      {/* Right: Login Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          p: 2,
          background: { xs: '#fff', md: 'none' },
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            p: 3,
            boxShadow: 6,
            bgcolor: 'background.paper',
            opacity: 0.97,
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Sign in to SynapseStocks
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
            <Button color="secondary" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/register')}>
              Don't have an account? Sign up
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
