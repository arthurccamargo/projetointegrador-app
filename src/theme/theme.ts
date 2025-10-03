import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Special Gothic", "EB Garamond"'
  },

  palette: {
    primary: {
      main: '#22223b',
      contrastText: '#faffb4ff',
    },
    secondary: {
      main: '#faffb4ff',
      contrastText: '#22223b',
    },
    error: {
      main: '#E53935',
      contrastText: '#fff',
    },
    success: {
      main: '#43A047',
      contrastText: '#fff',
    },
    warning: {
      main: '#FFA726',
      contrastText: '#fff',
    },
    background: {
      default: '#faffb4ff',
      paper: '#fff',
    },
    text: {
      primary: '#121212ff',
      secondary: '#f1f1f1ff',
    },
  },
});

export default theme;
