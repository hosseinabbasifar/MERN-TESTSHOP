import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Alert,
  alpha,
  Stack,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  AssignmentReturn as ReturnIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  Inventory as PackageIcon,
  LocalShipping as ShipIcon,
  AccountBalance as RefundIcon,
} from '@mui/icons-material';

const ReturnsScreen = () => {
  const theme = useTheme();

  const eligibleItems = [
    'Unused products in original packaging',
    'Items with all tags and labels attached',
    'Products returned within 30 days of delivery',
    'Items accompanied by original receipt',
    'Products not damaged by customer misuse',
  ];

  const nonEligibleItems = [
    'Opened software or digital products',
    'Customized or personalized items',
    'Clearance or final sale items',
    'Products without original packaging',
    'Items damaged due to improper use',
  ];

  const returnSteps = [
    {
      icon: <EmailIcon />,
      title: 'Contact Support',
      description:
        'Email us at hossein.abbasifar@gmail.com with your order number',
    },
    {
      icon: <PackageIcon />,
      title: 'Package Item',
      description: 'Securely pack the item in its original packaging',
    },
    {
      icon: <ShipIcon />,
      title: 'Ship Item',
      description: 'Send the package using provided return label',
    },
    {
      icon: <RefundIcon />,
      title: 'Receive Refund',
      description: 'Get your refund within 5-10 business days',
    },
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
          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <ReturnIcon sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Returns & Refunds
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Your satisfaction is our priority
        </Typography>
      </Paper>

      {/* Policy Overview */}
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
            variant="h5"
            fontWeight={700}
            gutterBottom
            color="primary"
          >
            Our Return Policy
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.8, color: 'text.secondary' }}
          >
            We want you to be completely satisfied with your purchase. If you're
            not happy with your order, we offer a hassle-free 30-day return
            policy for most items.
          </Typography>
          <Alert severity="info" sx={{ borderRadius: 2, mt: 2 }}>
            Returns must be initiated within 30 days of delivery. Items must be
            in original condition.
          </Alert>
        </CardContent>
      </Card>

      {/* Eligible vs Non-Eligible */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              borderRadius: 3,
              border: `2px solid ${theme.palette.success.main}`,
              bgcolor: alpha(theme.palette.success.main, 0.02),
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <CheckIcon color="success" sx={{ fontSize: 32 }} />
                <Typography variant="h6" fontWeight={700}>
                  Eligible for Return
                </Typography>
              </Stack>
              <List>
                {eligibleItems.map((item, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              borderRadius: 3,
              border: `2px solid ${theme.palette.error.main}`,
              bgcolor: alpha(theme.palette.error.main, 0.02),
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <CancelIcon color="error" sx={{ fontSize: 32 }} />
                <Typography variant="h6" fontWeight={700}>
                  Not Eligible for Return
                </Typography>
              </Stack>
              <List>
                {nonEligibleItems.map((item, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CancelIcon color="error" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Return Process */}
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
            How to Return an Item
          </Typography>

          <Stepper activeStep={-1} orientation="vertical">
            {returnSteps.map((step, index) => (
              <Step key={index} expanded>
                <StepLabel
                  StepIconComponent={() => (
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    >
                      {step.icon}
                    </Box>
                  )}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {step.title}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ pl: 7, pb: 2 }}
                  >
                    {step.description}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Refund Information */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: alpha(theme.palette.warning.main, 0.05),
              border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Refund Timeline
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Once we receive your return, please allow 3-5 business days for
              inspection. Approved refunds will be processed to your original
              payment method within 5-10 business days.
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: alpha(theme.palette.info.main, 0.05),
              border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Need Help?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Our customer service team is here to help with any return
              questions. Contact us at hossein.abbasifar@gmail.com or call
              +98-930-330-3361.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ReturnsScreen;
