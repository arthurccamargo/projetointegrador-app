import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Special Gothic", "BBH Sans Bartle"'
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
      main: 'hsla(8, 82%, 60%, 1.00)',
      contrastText: '#fff',
    },
    success: {
      main: 'hsla(156, 67%, 40%, 1.00)',
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
