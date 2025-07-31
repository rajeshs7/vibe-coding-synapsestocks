import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      contrastText: '#fff',
    },
    secondary: {
      main: '#764ba2',
      contrastText: '#fff',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(255,255,255,0.15)',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontWeightBold: 700,
    h4: {
      fontWeight: 700,
      letterSpacing: 1,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          background: 'rgba(255,255,255,0.7)',
        },
      },
    },
  },
});

export default theme;
