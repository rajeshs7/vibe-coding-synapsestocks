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
  <div
    style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto',
    }}
  >
    <Grid container sx={{ minHeight: '100vh' }} alignItems="center" justifyContent="center">
      <Grid item xs={12} sm={8} md={4} display="flex" alignItems="center" justifyContent="center">
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            px: 4,
            py: 5,
            borderRadius: 5,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            opacity: 1,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
                color: '#333',
                textAlign: 'center',
                mb: 3,
                textShadow: '0 1px 2px rgba(255,255,255,0.2)'
              }}
            >
              Register for SynapseStocks
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>Registration successful! Redirecting to login...</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
                margin="normal"
                required
                sx={{
                  input: {
                    bgcolor: 'rgba(255,255,255,0.7)',
                    borderRadius: 2,
                  },
                  mb: 2,
                }}
              />
              <TextField
                label="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                fullWidth
                margin="normal"
                required
                sx={{
                  input: {
                    bgcolor: 'rgba(255,255,255,0.7)',
                    borderRadius: 2,
                  },
                  mb: 2,
                }}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
                sx={{
                  input: {
                    bgcolor: 'rgba(255,255,255,0.7)',
                    borderRadius: 2,
                  },
                  mb: 2,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 14px 0 rgba(118,75,162,0.2)',
                  transition: '0.2s',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)',
                    boxShadow: '0 6px 20px 0 rgba(118,75,162,0.25)',
                  },
                }}
              >
                Register
              </Button>
            </form>
            <Button
              color="secondary"
              fullWidth
              sx={{
                mt: 2,
                borderRadius: 3,
                fontWeight: 500,
                fontSize: '1rem',
                textTransform: 'none',
                background: 'rgba(255,255,255,0.5)',
                color: '#764ba2',
                boxShadow: 'none',
                transition: '0.2s',
                '&:hover': {
                  background: 'rgba(255,255,255,0.7)',
                  color: '#667eea',
                },
              }}
              onClick={() => navigate('/login')}
            >
              Already have an account? Login
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </div>
);
}
