import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from './utils/ThemeContext';
import { ToastContainer } from 'react-toastify';

// Bootstrap Components
import Header from './components/Header';
import Footer from './components/Footer';
import { Container as BootstrapContainer } from 'react-bootstrap';

// Material-UI Components
import MuiHeader from './material-ui/components/MuiHeader';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container as MuiContainer } from '@mui/material';
import materialUiTheme from './material-ui/styles/materialUiTheme';
import MuiFooter from './material-ui/components/MuiFooter';

const RootLayout = () => {
  const { currentTheme, mode } = useTheme();
  const theme = materialUiTheme(mode);

  if (currentTheme === 'material-ui') {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <MuiHeader />
        <main>
          <MuiContainer sx={{ paddingY: 3 }}>
            <Outlet />
          </MuiContainer>
        </main>
        <MuiFooter />
      </MuiThemeProvider>
    );
  }

  // Fallback to Bootstrap theme
  return (
    <>
      <ToastContainer />
      <Header />
      <main className="py-3">
        <BootstrapContainer>
          <Outlet />
        </BootstrapContainer>
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;