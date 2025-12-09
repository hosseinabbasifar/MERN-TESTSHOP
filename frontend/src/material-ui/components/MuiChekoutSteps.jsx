import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  alpha,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Login as LoginIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  ShoppingBag as OrderIcon,
} from '@mui/icons-material';

const MuiCheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const theme = useTheme();
  const location = useLocation();

  const steps = [
    {
      label: 'Sign In',
      active: step1,
      path: '/login',
      icon: <LoginIcon />,
    },
    {
      label: 'Shipping',
      active: step2,
      path: '/shipping',
      icon: <ShippingIcon />,
    },
    {
      label: 'Payment',
      active: step3,
      path: '/payment',
      icon: <PaymentIcon />,
    },
    {
      label: 'Place Order',
      active: step4,
      path: '/placeorder',
      icon: <OrderIcon />,
    },
  ];

  const activeStep = steps.findIndex((step) => location.pathname === step.path);

  return (
    <Box sx={{ mb: 6, px: 2 }}>
      <Stepper
        activeStep={activeStep >= 0 ? activeStep : 0}
        alternativeLabel
        sx={{
          '& .MuiStepConnector-root': {
            top: 22,
            '& .MuiStepConnector-line': {
              height: 3,
              border: 0,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              borderRadius: 1,
            },
          },
          '& .MuiStepConnector-active .MuiStepConnector-line': {
            backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          },
          '& .MuiStepConnector-completed .MuiStepConnector-line': {
            backgroundImage: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
          },
        }}
      >
        {steps.map((stepData, index) => (
          <Step key={stepData.label}>
            <StepLabel
              StepIconComponent={({ active, completed }) => (
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: completed
                      ? theme.palette.success.main
                      : active
                      ? theme.palette.primary.main
                      : alpha(theme.palette.text.secondary, 0.1),
                    color:
                      completed || active
                        ? 'white'
                        : theme.palette.text.secondary,
                    border: `2px solid ${
                      completed
                        ? theme.palette.success.main
                        : active
                        ? theme.palette.primary.main
                        : alpha(theme.palette.text.secondary, 0.3)
                    }`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: stepData.active ? 'pointer' : 'default',
                    '&:hover': stepData.active && {
                      transform: 'scale(1.1)',
                      boxShadow: `0 4px 12px ${alpha(
                        theme.palette.primary.main,
                        0.3
                      )}`,
                    },
                  }}
                  component={stepData.active ? Link : 'div'}
                  to={stepData.active ? stepData.path : undefined}
                >
                  {React.cloneElement(stepData.icon, { fontSize: 'small' })}
                </Box>
              )}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: index <= activeStep ? 600 : 400,
                  color:
                    index <= activeStep ? 'text.primary' : 'text.secondary',
                  mt: 1,
                }}
              >
                {stepData.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default MuiCheckoutSteps;
