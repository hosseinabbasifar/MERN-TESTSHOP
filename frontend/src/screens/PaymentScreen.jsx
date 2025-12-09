import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { SavePaymentMethod } from '../slices/cartSlice';

//Mui imports
import {
  Typography,
  Button as MuiButton,
  Card,
  CardContent,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  alpha,
  Paper,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as PayPalIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import MuiContainer from '../material-ui/components/MuiContainer';
import MuiCheckoutSteps from '../material-ui/components/MuiChekoutSteps';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../utils/ThemeContext';

/**
 * The default payment method is set to PayPal for development purposes.
 * This component is designed to allow easy addition of other payment methods, any other local payment options.
 */
const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { currentTheme } = useTheme();
  const theme = useMuiTheme();

  // Redirect to shipping if no address is provided
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  // State to hold the selected payment method, defaulting to PayPal
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  /**
   * Handles form submission to save the selected payment method
   * @param {Event} e - The form submission event
   */
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(SavePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  const paymentOptions = [
    {
      value: 'PayPal',
      label: 'PayPal or Credit Card',
      description: 'Secure payment via PayPal',
      icon: <PayPalIcon />,
      popular: true,
    },
    {
      value: 'Stripe',
      label: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: <CreditCardIcon />,
      popular: false,
    },
  ];

  if (currentTheme === 'bootstrap') {
    return (
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                className="my-2"
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <MuiCheckoutSteps step1 step2 step3 />

      <MuiContainer>
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            overflow: 'hidden',
            maxWidth: 500,
            mx: 'auto',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 3,
              background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -30,
                right: -30,
                width: 80,
                height: 80,
                background: alpha('#fff', 0.1),
                borderRadius: '50%',
              },
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                p: 1.5,
                borderRadius: 2,
                bgcolor: alpha('#fff', 0.15),
                mb: 2,
              }}
            >
              <PaymentIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Payment Method
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Choose your preferred payment option
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={submitHandler}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel
                  component="legend"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mb: 3,
                    '&.Mui-focused': {
                      color: theme.palette.text.primary,
                    },
                  }}
                >
                  Select Payment Method
                </FormLabel>

                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <Stack spacing={2}>
                    {paymentOptions.map((option) => (
                      <Paper
                        key={option.value}
                        elevation={0}
                        sx={{
                          border: `2px solid ${
                            paymentMethod === option.value
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                          borderRadius: 2,
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            borderColor: theme.palette.primary.main,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 12px ${alpha(
                              theme.palette.primary.main,
                              0.15
                            )}`,
                          },
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {option.popular && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
                              color: 'white',
                              px: 2,
                              py: 0.5,
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              borderBottomLeftRadius: 8,
                            }}
                          >
                            Popular
                          </Box>
                        )}

                        <FormControlLabel
                          value={option.value}
                          control={
                            <Radio
                              sx={{
                                '&.Mui-checked': {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                py: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 48,
                                  height: 48,
                                  borderRadius: 2,
                                  bgcolor: alpha(
                                    theme.palette.primary.main,
                                    0.1
                                  ),
                                  color: theme.palette.primary.main,
                                  mr: 2,
                                }}
                              >
                                {option.icon}
                              </Box>
                              <Box>
                                <Typography variant="body1" fontWeight={600}>
                                  {option.label}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {option.description}
                                </Typography>
                              </Box>
                            </Box>
                          }
                          sx={{
                            m: 0,
                            width: '100%',
                            px: 2,
                            '& .MuiFormControlLabel-label': {
                              width: '100%',
                            },
                          }}
                        />
                      </Paper>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>

              <MuiButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                endIcon={<ArrowIcon />}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1rem',
                  mt: 4,
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 24px ${alpha(
                      theme.palette.secondary.main,
                      0.25
                    )}`,
                  },
                }}
              >
                Continue to Review Order
              </MuiButton>
            </Box>
          </CardContent>
        </Card>
      </MuiContainer>
    </Box>
  );
};

export default PaymentScreen;
