import { createTheme } from '@mui/material/styles';
import {
  deepPurple,
  teal,
  amber,
  grey
} from '@mui/material/colors';

const materialUiTheme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500], // #673AB7
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: teal[500], // #009688
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#28a745',
      contrastText: '#FFFFFF',
    },
    error: {
      main: amber[500], // #FFC107 - به عنوان رنگ برجسته و هشدار استفاده می‌شود
      contrastText: '#FFFFFF',
    },
    background: {
      default: grey[50], // #FAFAFA
      paper: '#FFFFFF',
    },
    text: {
      primary: grey[900], // #212121
      secondary: grey[700],
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.1rem',
    },
    h5: {
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.1rem',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: deepPurple[500],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontSize: '0.7rem',
          height: '18px',
          minWidth: '18px',
          padding: '0 6px',
          borderRadius: '9px',
        },
      },
    },
  },
  spacing: 8,
});

export default materialUiTheme;