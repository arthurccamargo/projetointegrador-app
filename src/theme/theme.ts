import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "Special Gothic"
  },

  palette: {
    primary: {
      main: '#ff7a27ff',
      contrastText: '#faffb4ff',
    },
    secondary: {
      main: '#faffb4ff',
      contrastText: '#e6e6e6ff',
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
      default: '#f5f5f5',
      paper: '#fff',
    },
    text: {
      primary: '#121212ff',
      secondary: '#f1f1f1ff',
    },
  },
});

export default theme;
