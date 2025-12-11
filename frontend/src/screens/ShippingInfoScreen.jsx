import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stepper,
  Step,
  StepLabel,
  Chip,
  alpha,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  LocalShipping as ShippingIcon,
  CheckCircle as CheckIcon,
  Flight as FlightIcon,
  Public as GlobalIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

const ShippingInfoScreen = () => {
  const theme = useTheme();

  const shippingOptions = [
    {
      name: 'Standard Shipping',
      time: '5-7 Business Days',
      cost: 'Free over $50',
      icon: <ShippingIcon />,
      color: theme.palette.primary.main,
    },
    {
      name: 'Express Shipping',
      time: '2-3 Business Days',
      cost: '$15.99',
      icon: <SpeedIcon />,
      color: theme.palette.warning.main,
    },
    {
      name: 'International',
      time: '10-15 Business Days',
      cost: 'Varies by location',
      icon: <GlobalIcon />,
      color: theme.palette.info.main,
    },
  ];

  const countries = [
    { region: 'North America', time: '7-10 days', cost: '$25' },
    { region: 'Europe', time: '10-14 days', cost: '$30' },
    { region: 'Asia', time: '8-12 days', cost: '$28' },
    { region: 'Middle East', time: '10-15 days', cost: '$35' },
    { region: 'Australia', time: '12-16 days', cost: '$40' },
  ];

  const trackingSteps = [
    'Order Placed',
    'Processing',
    'Shipped',
    'In Transit',
    'Out for Delivery',
    'Delivered',
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
        }}
      >
        <ShippingIcon sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Shipping Information
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Fast, reliable delivery to your doorstep
        </Typography>
      </Paper>

      {/* Shipping Options */}
      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
        Shipping Options
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {shippingOptions.map((option, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 24px ${alpha(option.color, 0.15)}`,
                },
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(option.color, 0.1),
                  color: option.color,
                  mb: 2,
                }}
              >
                {option.icon}
              </Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                {option.name}
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                fontWeight={700}
                gutterBottom
              >
                {option.cost}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estimated delivery: {option.time}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* International Shipping */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <FlightIcon color="info" sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight={700}>
              International Shipping Rates
            </Typography>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: alpha(theme.palette.info.main, 0.05),
                    '& th': { fontWeight: 600 },
                  }}
                >
                  <TableCell>Region</TableCell>
                  <TableCell>Delivery Time</TableCell>
                  <TableCell align="right">Shipping Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countries.map((country, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                      },
                    }}
                  >
                    <TableCell>
                      <Typography fontWeight={500}>{country.region}</Typography>
                    </TableCell>
                    <TableCell>{country.time}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={country.cost}
                        size="small"
                        color="primary"
                        sx={{ borderRadius: 2 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Order Tracking */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
            Track Your Order
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{ mb: 4 }}
          >
            Once your order is shipped, you'll receive a tracking number via
            email. Here's what to expect during the shipping process:
          </Typography>
          <Stepper activeStep={3} alternativeLabel>
            {trackingSteps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: alpha(theme.palette.success.main, 0.05),
          border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
        }}
      >
        <Stack direction="row" spacing={2}>
          <CheckIcon color="success" />
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Free Shipping Available!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get free standard shipping on all orders over $50. Express and
              international shipping rates apply. Delivery times may vary based
              on location and customs processing.
            </Typography>
          </Box>
        </Stack>
      </Card>
    </Container>
  );
};
export default ShippingInfoScreen;
