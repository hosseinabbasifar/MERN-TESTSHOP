import React, { createContext, useContext, useState } from 'react';

// Create Context
const ThemeContext = createContext();

// Provider component
export const AppThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('bootstrap');

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => 
      prevTheme === 'bootstrap' ? 'material-ui' : 'bootstrap'
    );
  };

  const contextValue = {
    currentTheme,
    setCurrentTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use as theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within an AppThemeProvider');
  }
  
  return context;
};

export default ThemeContext;