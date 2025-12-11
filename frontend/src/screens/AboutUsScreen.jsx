import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Stack,
  Grid,
  Card,
  CardContent,
  Avatar,
  alpha,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Store as StoreIcon,
  Verified as VerifiedIcon,
  TrendingUp as GrowthIcon,
  People as PeopleIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  EmojiEvents as AwardIcon,
} from '@mui/icons-material';

const AboutUsScreen = () => {
  const theme = useTheme();

  const values = [
    {
      icon: <VerifiedIcon />,
      title: 'Quality Products',
      description:
        'We ensure every product meets the highest quality standards',
      color: theme.palette.primary.main,
    },
    {
      icon: <SecurityIcon />,
      title: 'Secure Shopping',
      description:
        'Your data and transactions are protected with top-level security',
      color: theme.palette.success.main,
    },
    {
      icon: <ShippingIcon />,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep',
      color: theme.palette.warning.main,
    },
    {
      icon: <SupportIcon />,
      title: '24/7 Support',
      description: 'Our team is always ready to help you',
      color: theme.palette.info.main,
    },
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers', icon: <PeopleIcon /> },
    { number: '5K+', label: 'Products Sold', icon: <StoreIcon /> },
    { number: '98%', label: 'Satisfaction Rate', icon: <AwardIcon /> },
    { number: '50+', label: 'Countries Served', icon: <GrowthIcon /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 150,
            height: 150,
            background: alpha('#fff', 0.1),
            borderRadius: '50%',
          }}
        />
        <Typography variant="h3" fontWeight={700} gutterBottom>
          About MERN-TESTSHOP
        </Typography>
        <Typography
          variant="h6"
          sx={{ opacity: 0.9, maxWidth: 800, mx: 'auto' }}
        >
          Your trusted partner for premium digital products and electronics
        </Typography>
      </Paper>

      {/* Story Section */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            color="primary"
          >
            Our Story
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.8, color: 'text.secondary' }}
          >
            Founded in 2025, MERN-TESTSHOP started with a simple mission: to
            provide high-quality digital products and electronics to customers
            worldwide. What began as a small startup has grown into a trusted
            e-commerce platform serving thousands of satisfied customers across
            the globe.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.8, color: 'text.secondary' }}
          >
            We believe in the power of technology to transform lives. Our
            carefully curated selection of products represents the best in
            innovation, quality, and value. From the latest gadgets to essential
            accessories, we ensure that every item in our catalog meets our
            strict standards.
          </Typography>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 24px ${alpha(
                    theme.palette.primary.main,
                    0.15
                  )}`,
                },
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  mb: 2,
                }}
              >
                {stat.icon}
              </Box>
              <Typography variant="h3" fontWeight={700} color="primary">
                {stat.number}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Values Section */}
      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
        Our Values
      </Typography>
      <Grid container spacing={3}>
        {values.map((value, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                height: '100%',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 24px ${alpha(value.color, 0.15)}`,
                },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar
                  sx={{
                    bgcolor: alpha(value.color, 0.1),
                    color: value.color,
                    width: 56,
                    height: 56,
                  }}
                >
                  {value.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default AboutUsScreen;