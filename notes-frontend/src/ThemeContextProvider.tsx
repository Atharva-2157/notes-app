import React, { createContext, useState, useMemo, useContext } from 'react';
import { type Theme } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  currentTheme: Theme;
}

const THEME_STORAGE_KEY = 'notesAppThemeMode';

const getInitialTheme = (): 'light' | 'dark' => {
  const storedMode = localStorage.getItem(THEME_STORAGE_KEY);

  if (storedMode === 'dark') {
    return 'dark';
  }
  
  return 'light';
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(getInitialTheme);

  const toggleTheme = useMemo(() => () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_STORAGE_KEY, newMode);
      return newMode;
    });
  }, []);

  const currentTheme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  const contextValue = useMemo(() => ({ mode, toggleTheme, currentTheme }), [mode, toggleTheme, currentTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};