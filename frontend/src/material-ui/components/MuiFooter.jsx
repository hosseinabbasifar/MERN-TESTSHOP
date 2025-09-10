import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  IconButton,
  Link as MuiLink,
} from '@mui/material';
import {
  Instagram as InstagramIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Place as PlaceIcon,
  GitHub as GitHubIcon,
  WhatsApp as WhatsAppIcon,
  Telegram as TelegramIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';

const MuiFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.grey[900]
            : theme.palette.grey[200],
        color: (theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Column 1: Company Info & Social Media */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}
            >
              MERN-TESTSHOP
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Your one-stop shop for digital products and accessories.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <IconButton
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[50]
                      : theme.palette.grey[900],
                }}
              >
                <LinkedInIcon />
              </IconButton>
              

                
              <IconButton
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[50]
                      : theme.palette.grey[900],
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[50]
                      : theme.palette.grey[900],
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Column 2: Navigation Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <MuiLink href="#" color="inherit" underline="hover">
                Privacy Policy
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover">
                Terms & Conditions
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover">
                FAQ
              </MuiLink>
            </Box>
          </Grid>

          {/* Column 3: Contact Information */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Contact Us
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PlaceIcon fontSize="small" />
                <Typography variant="body2">Khoy, IRAN</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <WhatsAppIcon fontSize="small" />
                <TelegramIcon fontSize="small" />
                <Typography variant="body2">+98 - 930 - 330 - 3361</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">
                  hossein.abbasifar@gmail.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Divider sx={{ my: 4, borderColor: 'text.secondary' }} />
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} MERN-TESTSHOP. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default MuiFooter;
