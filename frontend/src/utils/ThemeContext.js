import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import bootstrapCustomCss from '../assets/styles/bootstrap.custom.css'; // Import the CSS file

// Create Context
const ThemeContext = createContext();

// Provider component
export const AppThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('material-ui');
  const [mode, setMode] = useState('dark'); // 'light' or 'dark'

  // Function to toggle between themes

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === 'bootstrap' ? 'material-ui' : 'bootstrap'
    );
  };
 
  //Function to toggle between light and dark mode
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Logic to ditionally inject or remove Bootstrap stylesheet
  useEffect(() => {
    const bootstrapStyle = document.getElementById('bootstrap-styles');

    if (currentTheme === 'bootstrap') {
      if (!bootstrapStyle) {
        // Create and add style tag for Bootstrap styles
        const style = document.createElement('style');
        style.id = 'bootstrap-styles';
        style.innerHTML = bootstrapCustomCss;
        document.head.appendChild(style);
      }
    } else {
      if (bootstrapStyle) {
        // Remove style tag for Bootstrap styles
        bootstrapStyle.remove();
      }
    }
  }, [currentTheme]); // This effect runs whenever the theme changes

  const contextValue = useMemo(
    () => ({
      currentTheme,
      mode,
      setCurrentTheme,
      setMode,
      toggleTheme,
      toggleMode,
    }),
    [currentTheme, mode]
  );

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
