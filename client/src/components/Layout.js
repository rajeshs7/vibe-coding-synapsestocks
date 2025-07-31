import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/agents', label: 'Agent Configurator' },
  { to: '/results', label: 'Results & Insights' },
];

const Layout = () => (
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
      </Toolbar>
    </AppBar>
    <Container sx={{ mt: 4 }}>
      <Outlet />
    </Container>
  </>
);

export default Layout;
