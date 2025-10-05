import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeContextProvider, useThemeContext } from './ThemeContextProvider.tsx'; 

const Root = () => {
  const { currentTheme } = useThemeContext();

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <Root />
    </ThemeContextProvider>
  </React.StrictMode>,
);