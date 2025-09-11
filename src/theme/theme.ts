import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFE400',
      contrastText: '#FFD600',
    },
    secondary: {
      main: '#1E3A8A',
      contrastText: '#fff',
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
      primary: '#000000',
      secondary: '#ffffff',
    },
  },
});

export default theme;
