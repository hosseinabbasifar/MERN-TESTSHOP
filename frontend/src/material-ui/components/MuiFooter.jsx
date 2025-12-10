import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  IconButton,
  Link as MuiLink,
  Stack,
  Tooltip,
  alpha,
  Paper,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Instagram as InstagramIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Place as PlaceIcon,
  GitHub as GitHubIcon,
  WhatsApp as WhatsAppIcon,
  Telegram as TelegramIcon,
  LinkedIn as LinkedInIcon,
  FavoriteBorder as HeartIcon,
  Security as SecurityIcon,
  LocalShipping as ShippingIcon,
  Support as SupportIcon,
} from '@mui/icons-material';

const MuiFooter = () => {
  const theme = useTheme();
  const socialLinks = [
    {
      icon: <LinkedInIcon />,
      name: 'LinkedIn',
      color: '#0077B5',
      href: 'https://linkedin.com',
    },
    {
      icon: <GitHubIcon />,
      name: 'GitHub',
      color: theme.palette.mode === 'dark' ? '#fff' : '#333',
      href: 'https://github.com',
    },
    {
      icon: <InstagramIcon />,
      name: 'Instagram',
      color: '#E4405F',
      href: 'https://instagram.com',
    },
    {
      icon: <TelegramIcon />,
      name: 'Telegram',
      color: '#0088CC',
      href: 'https://telegram.org',
    },
    {
      icon: <WhatsAppIcon />,
      name: 'WhatsApp',
      color: '#25D366',
      href: 'https://whatsapp.com',
    },
  ];
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
  ];
  const paymentMethods = ['Visa', 'Mastercard', 'PayPal', 'Stripe'];
  const trustFeatures = [
    { icon: <SecurityIcon />, label: 'Secure Payment' },
    { icon: <ShippingIcon />, label: 'Free Shipping' },
    { icon: <SupportIcon />, label: '24/7 Support' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(180deg, ${
                theme.palette.background.paper
              } 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`
            : `linear-gradient(180deg, ${alpha(
                theme.palette.grey[50],
                0.8
              )} 0%, ${theme.palette.background.paper} 100%)`,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: alpha(theme.palette.primary.main, 0.04),
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -60,
          left: -60,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: alpha(theme.palette.secondary.main, 0.03),
          filter: 'blur(40px)',
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {' '}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Company Info & Social Media */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            <Stack spacing={3} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                  }}
                >
                  MERN-TESTSHOP
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.8,
                    maxWidth: { xs: '100%', sm: 400, md: 350 },
                    textAlign: { xs: 'center', md: 'left' },
                    fontWeight: 400,
                  }}
                >
                  Your trusted destination for premium digital products and
                  accessories. Quality, innovation, and customer satisfaction
                  guaranteed.
                </Typography>
              </Box>

              {/* Trust Features */}
              <Stack
                direction="row"
                spacing={2}
                flexWrap="wrap"
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                {trustFeatures.map((feature, index) => (
                  <Tooltip key={index} title={feature.label}>
                    <Paper
                      elevation={0}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        border: `1px solid ${alpha(
                          theme.palette.primary.main,
                          0.2
                        )}`,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {React.cloneElement(feature.icon, {
                        fontSize: 'small',
                        sx: { color: theme.palette.primary.main },
                      })}
                      <Typography variant="caption" fontWeight={500}>
                        {feature.label}
                      </Typography>
                    </Paper>
                  </Tooltip>
                ))}
              </Stack>

              {/* Social Icons */}
              <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                {socialLinks.map((social, index) => (
                  <Tooltip key={index} title={social.name}>
                    <IconButton
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="medium"
                      sx={{
                        bgcolor: alpha(social.color, 0.1),
                        color: social.color,
                        border: `1px solid ${alpha(social.color, 0.2)}`,
                        '&:hover': {
                          bgcolor: alpha(social.color, 0.2),
                          transform: 'translateY(-4px)',
                          boxShadow: `0 8px 20px ${alpha(social.color, 0.3)}`,
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
                position: 'relative',
                color: theme.palette.text.primary,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: { xs: '50%', md: 0 },
                  transform: { xs: 'translateX(-50%)', md: 'none' },
                  width: 50,
                  height: 3,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 2,
                },
              }}
            >
              Quick Links
            </Typography>

            <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
              {quickLinks.map((link, index) => (
                <MuiLink
                  key={index}
                  href={link.href}
                  color="text.secondary"
                  underline="none"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: { xs: 'none', md: 'translateX(8px)' },
                    },
                    '&::before': {
                      content: '"→"',
                      marginRight: 1,
                      color: theme.palette.primary.main,
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      fontSize: '1rem',
                    },
                    '&:hover::before': {
                      opacity: 1,
                    },
                  }}
                >
                  {link.name}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
                position: 'relative',
                color: theme.palette.text.primary,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: { xs: '50%', md: 0 },
                  transform: { xs: 'translateX(-50%)', md: 'none' },
                  width: 50,
                  height: 3,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 2,
                },
              }}
            >
              Contact Us
            </Typography>

            <Stack
              spacing={2.5}
              alignItems={{ xs: 'center', md: 'flex-start' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: { xs: 'center', md: 'flex-start' },
                  gap: 2,
                  flexDirection: { xs: 'column', md: 'row' },
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mt: { xs: 0, md: 0.5 },
                  }}
                >
                  <PlaceIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Our Location
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    Khoy, West Azerbaijan
                    <br />
                    Iran, Middle East
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: { xs: 'center', md: 'center' },
                  gap: 2,
                  flexDirection: { xs: 'column', md: 'row' },
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main,
                  }}
                >
                  <Stack direction="row" spacing={0.5}>
                    <PhoneIcon fontSize="small" />
                    <WhatsAppIcon fontSize="small" />
                    <TelegramIcon fontSize="small" />
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Phone & Messaging
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +98 - 930 - 330 - 3361
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: { xs: 'center', md: 'center' },
                  gap: 2,
                  flexDirection: { xs: 'column', md: 'row' },
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    color: theme.palette.info.main,
                  }}
                >
                  <EmailIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Email Support
                  </Typography>
                  <Typography
                    variant="body2"
                    component="a"
                    href="mailto:hossein.abbasifar@gmail.com"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: theme.palette.info.main,
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    hossein.abbasifar@gmail.com
                  </Typography>
                </Box>
              </Box>


            </Stack>
          </Grid>
        </Grid>
        {/* Bottom Section */}
        <Divider
          sx={{
            my: { xs: 3, md: 5 },
            borderColor: alpha(theme.palette.divider, 0.3),
            '&::before, &::after': {
              borderTopColor: alpha(theme.palette.divider, 0.3),
            },
          }}
        />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
          textAlign={{ xs: 'center', sm: 'left' }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 500,
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            © {new Date().getFullYear()} MERN-TESTSHOP. Made with
            <HeartIcon
              fontSize="small"
              sx={{
                color: theme.palette.error.main,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            />
            in Iran 🇮🇷
          </Typography>

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
            flexWrap="wrap"
          >
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              Secure payments:
            </Typography>
            {paymentMethods.map((payment) => (
              <Chip
                key={payment}
                label={payment}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  borderColor: alpha(theme.palette.text.secondary, 0.3),
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default MuiFooter;
