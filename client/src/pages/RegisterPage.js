import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const API_URL = process.env.REACT_APP_API_URL || '';
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto' }}>
        <Card sx={{ minWidth: 350, p: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Register for SynapseStocks</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>Registration successful! Redirecting to login...</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
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
                Register
              </Button>
            </form>
            <Button color="secondary" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/login')}>
              Already have an account? Login
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
