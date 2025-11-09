import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  typography: {
    fontFamily: '"Special Gothic", "BBH Sans Bartle"'
  },

  palette: {
    primary: {
      main: '#22223b',
      contrastText: '#f1f1f1ff',
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
      default: '#fff',
      paper: '#F8F8F8',
    },
    text: {
      primary: '#121212ff',
      secondary: '#808080',
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: '"Special Gothic", "BBH Sans Bartle"'
  },

  palette: {
    primary: {
      main: '#22223b',
      contrastText: '#f1f1f1ff',
    },
    secondary: {
      main: '#faffb4ff',
      contrastText: '#f1f1f1ff',
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
      default: '#1b1b1bff',
      paper: '#232323ff',
    },
    text: {
      primary: '#f1f1f1ff',
      secondary: '#121212ff',
    },
  },
});


