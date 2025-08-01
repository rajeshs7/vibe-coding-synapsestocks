import * as React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/agents', label: 'Agent Configurator' },
  { to: '/results', label: 'Results & Insights' },
];

const Layout = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {navLinks.map((link) => (
            <Button
              key={link.to}
              color="inherit"
              component={Link}
              to={link.to}
              sx={{ marginRight: 2 }}
            >
              {link.label}
            </Button>
          ))}
          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="error"
            variant="outlined"
            size="small"
            startIcon={<LogoutOutlinedIcon sx={{ fontSize: 18, color: '#fff' }} />}
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              ml: 2,
              minWidth: 0,
              px: 1,
              py: 0.25,
              fontSize: '0.92rem',
              border: '2px solid #fff',
              color: '#fff',
              letterSpacing: 0.5,
              textTransform: 'none',
              boxShadow: 0,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', border: '2px solid #fff', color: '#fff' }
            }}
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
