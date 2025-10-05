import { createTheme, type Theme } from '@mui/material/styles';

export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3F51B5',
    },
    secondary: {
      main: '#009688',
    },
    background: {
      default: '#F7F9F9', 
      paper: '#FFFFFF', 
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
    },
  },
});

export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7986CB',
    },
    secondary: {
      main: '#4DB6AC',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E', 
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderLeft: `5px solid #7986CB !important`,
        },
      },
    },
  },
});