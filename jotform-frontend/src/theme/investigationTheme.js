import { createTheme } from '@mui/material/styles'

const investigationTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1f5d9f',
      light: '#4c89c5',
      dark: '#163f68',
    },
    secondary: {
      main: '#d97706',
      light: '#efb15b',
      dark: '#9a5200',
    },
    background: {
      default: '#eef2f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#13233d',
      secondary: '#475569',
    },
    divider: 'rgba(19, 35, 61, 0.12)',
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(19, 35, 61, 0.08)',
          boxShadow: '0 10px 28px rgba(17, 24, 39, 0.06)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(19, 35, 61, 0.08)',
          boxShadow: '0 10px 24px rgba(17, 24, 39, 0.05)',
        },
      },
    },
  },
})

export default investigationTheme
