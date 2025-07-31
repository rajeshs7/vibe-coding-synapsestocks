import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';

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
    <Grid
      container
      sx={{ minHeight: '100vh' }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Card sx={{ width: '100%', maxWidth: 400, p: 3, boxShadow: 6, bgcolor: 'background.paper', opacity: 0.97 }}>
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
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Login
              </Button>
              <Button color="secondary" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/register')}>
                Don't have an account? Sign up
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
