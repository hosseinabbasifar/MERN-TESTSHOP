
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

const RootLayout = () => {
  const { currentTheme } = useTheme();

  if (currentTheme === 'material-ui') {
    return (
      <MuiThemeProvider theme={materialUiTheme}>
        <CssBaseline />
        <ToastContainer />
        <MuiHeader />
        <main>
          <MuiContainer sx={{ paddingY: 3 }}>
            <Outlet />
          </MuiContainer>
        </main>
        <Footer />
      </MuiThemeProvider>
    );
  }

  // Fallback to Bootstrap theme by default
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