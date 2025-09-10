import { createTheme } from '@mui/material/styles';

// German-inspired color palette based on flatuicolors.com/palette/de
const Colors = {
  fusionRed: '#FC5C65',
  orangeHibiscus: '#FD9644',
  flirtatious: '#FED330',
  nycTaxi: '#F7B731',
  turquoise: '#4BCFFA',
  highBlue: '#45AAF2',
  lighterPurple: '#A55EEA',
  twinkleBlue: '#26DE81',
  blueGrey: '#778CA3',
  innuendo: '#A5B1C2',
  blueHorizon: '#4B6584',
  germanDark: '#2C3A47',
};

const materialUiTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? Colors.highBlue : Colors.turquoise,
        light: mode === 'light' ? Colors.turquoise : '#6DD5FA',
        dark: mode === 'light' ? Colors.blueHorizon : Colors.highBlue,
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: Colors.fusionRed,
        light: '#FF7979',
        dark: '#EA4C4C',
        contrastText: '#FFFFFF',
      },
      success: {
        main: Colors.twinkleBlue,
        light: '#55EFC4',
        dark: '#00B894',
        contrastText: '#FFFFFF',
      },
      warning: {
        main: Colors.nycTaxi,
        light: Colors.flirtatious,
        dark: Colors.orangeHibiscus,
        contrastText: mode === 'light' ? '#2C3A47' : '#000000',
      },
      error: {
        main: mode === 'light' ? '#EE5A24' : '#FF6B6B',
        light: mode === 'light' ? '#FF6B6B' : '#FF8787',
        dark: mode === 'light' ? '#C0392B' : '#EE5A24',
        contrastText: '#FFFFFF',
      },
      grey:
        mode === 'light'
          ? {
              50: '#FAFBFC',
              100: '#F4F6F8',
              200: '#E9ECF0',
              300: '#DFE3E8',
              400: Colors.innuendo,
              500: Colors.blueGrey,
              600: Colors.blueHorizon,
              700: '#3E4C59',
              800: Colors.germanDark,
              900: '#1E272E',
            }
          : {
              50: '#1E272E',
              100: '#2C3A47',
              200: '#3E4C59',
              300: '#4B6584',
              400: '#778CA3',
              500: '#A5B1C2',
              600: '#DFE3E8',
              700: '#E9ECF0',
              800: '#F4F6F8',
              900: '#FAFBFC',
            },
      background: {
        default: mode === 'light' ? '#FAFBFC' : '#0F1419',
        paper: mode === 'light' ? '#FFFFFF' : '#1A1F2E',
      },
      text: {
        primary: mode === 'light' ? Colors.germanDark : '#F7F9FB',
        secondary: mode === 'light' ? Colors.blueGrey : '#B8BCC8',
        disabled: mode === 'light' ? Colors.innuendo : '#6C7293',
      },
      action: {
        active: mode === 'light' ? Colors.highBlue : Colors.turquoise,
        hover:
          mode === 'light'
            ? 'rgba(69, 170, 242, 0.04)'
            : 'rgba(75, 207, 250, 0.04)',
        selected:
          mode === 'light'
            ? 'rgba(69, 170, 242, 0.08)'
            : 'rgba(75, 207, 250, 0.08)',
        disabled: mode === 'light' ? Colors.innuendo : '#6C7293',
        disabledBackground:
          mode === 'light'
            ? 'rgba(165, 177, 194, 0.12)'
            : 'rgba(108, 114, 147, 0.12)',
      },
      divider:
        mode === 'light'
          ? 'rgba(165, 177, 194, 0.2)'
          : 'rgba(108, 114, 147, 0.2)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica Neue", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '3rem',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        fontSize: '2.25rem',
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
      },
      h3: { fontWeight: 600, fontSize: '1.875rem', lineHeight: 1.4 },
      h4: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.4 },
      h5: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.5 },
      h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.6 },
      subtitle1: {
        fontSize: '1rem',
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.57,
        letterSpacing: '0.00714em',
      },
      body1: { fontSize: '1rem', lineHeight: 1.75, letterSpacing: '0.00938em' },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
        letterSpacing: '0.01071em',
      },
      button: {
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.75,
        letterSpacing: '0.02857em',
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      'none',
      '0px 1px 3px rgba(44, 58, 71, 0.05)',
      '0px 2px 4px rgba(44, 58, 71, 0.06)',
      '0px 3px 8px rgba(44, 58, 71, 0.08)',
      '0px 4px 12px rgba(44, 58, 71, 0.1)',
      '0px 5px 16px rgba(44, 58, 71, 0.12)',
      '0px 6px 20px rgba(44, 58, 71, 0.14)',
      '0px 7px 24px rgba(44, 58, 71, 0.16)',
      '0px 8px 28px rgba(44, 58, 71, 0.18)',
      '0px 9px 32px rgba(44, 58, 71, 0.2)',
      '0px 10px 36px rgba(44, 58, 71, 0.22)',
      '0px 11px 40px rgba(44, 58, 71, 0.24)',
      '0px 12px 44px rgba(44, 58, 71, 0.26)',
      '0px 13px 48px rgba(44, 58, 71, 0.28)',
      '0px 14px 52px rgba(44, 58, 71, 0.3)',
      '0px 15px 56px rgba(44, 58, 71, 0.32)',
      '0px 16px 60px rgba(44, 58, 71, 0.34)',
      '0px 17px 64px rgba(44, 58, 71, 0.36)',
      '0px 18px 68px rgba(44, 58, 71, 0.38)',
      '0px 19px 72px rgba(44, 58, 71, 0.4)',
      '0px 20px 76px rgba(44, 58, 71, 0.42)',
      '0px 21px 80px rgba(44, 58, 71, 0.44)',
      '0px 22px 84px rgba(44, 58, 71, 0.46)',
      '0px 23px 88px rgba(44, 58, 71, 0.48)',
      '0px 24px 92px rgba(44, 58, 71, 0.5)',
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { scrollBehavior: 'smooth' },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: ({ theme }) => ({
            borderBottom: `1px solid ${theme.palette.divider}`,
            backdropFilter: 'blur(20px)',
            backgroundColor:
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(26, 31, 46, 0.9)',
          }),
          colorPrimary: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.95)'
                : 'rgba(26, 31, 46, 0.95)',
            color: theme.palette.text.primary,
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '10px 24px',
            fontSize: '0.9375rem',
            fontWeight: 500,
            boxShadow: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': { transform: 'translateY(-2px)' },
          },
          contained: ({ theme }) => ({
            '&:hover': {
              boxShadow:
                theme.palette.mode === 'light'
                  ? '0px 8px 24px rgba(69, 170, 242, 0.2)'
                  : '0px 8px 24px rgba(109, 213, 250, 0.2)',
            },
          }),
          outlined: {
            borderWidth: 2,
            '&:hover': { borderWidth: 2 },
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 16,
            border: `1px solid ${theme.palette.divider}`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow:
                theme.palette.mode === 'light'
                  ? '0px 12px 36px rgba(44, 58, 71, 0.12)'
                  : '0px 12px 36px rgba(0, 0, 0, 0.3)',
            },
          }),
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: 'none',
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }),
          rounded: { borderRadius: 16 },
          elevation1: ({ theme }) => ({
            boxShadow:
              theme.palette.mode === 'light'
                ? '0px 2px 8px rgba(44, 58, 71, 0.08)'
                : '0px 2px 8px rgba(0, 0, 0, 0.2)',
          }),
          elevation2: ({ theme }) => ({
            boxShadow:
              theme.palette.mode === 'light'
                ? '0px 4px 16px rgba(44, 58, 71, 0.1)'
                : '0px 4px 16px rgba(0, 0, 0, 0.3)',
          }),
          elevation3: ({ theme }) => ({
            boxShadow:
              theme.palette.mode === 'light'
                ? '0px 6px 24px rgba(44, 58, 71, 0.12)'
                : '0px 6px 24px rgba(0, 0, 0, 0.4)',
          }),
        },
        variants: [
          {
            props: { variant: 'Form' },
            style: ({ theme }) => ({
              padding: theme.spacing(5),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 20,
              border: 'none',
              boxShadow:
                theme.palette.mode === 'light'
                  ? '0px 8px 32px rgba(44, 58, 71, 0.15)'
                  : '0px 8px 32px rgba(0, 0, 0, 0.5)',
              backgroundColor: theme.palette.background.paper,
            }),
          },
        ],
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            },
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 8, fontWeight: 500 },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            fontSize: '0.75rem',
            height: '20px',
            minWidth: '20px',
            padding: '0 6px',
            borderRadius: '10px',
            fontWeight: 600,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({ borderColor: theme.palette.divider }),
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: 12 },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === 'light' ? Colors.germanDark : '#F7F9FB',
            color:
              theme.palette.mode === 'light' ? '#FFFFFF' : Colors.germanDark,
            borderRadius: 8,
            fontSize: '0.8125rem',
            padding: '8px 12px',
          }),
        },
      },
    },
    spacing: 8,
  });

export default materialUiTheme;
