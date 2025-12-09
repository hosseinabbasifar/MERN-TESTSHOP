import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

//Mui Imports
import {
  TextField,
  Button as MuiButton,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  alpha,
  Grid,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import MuiCheckoutSteps from '../material-ui/components/MuiChekoutSteps';
import MuiContainer from '../material-ui/components/MuiContainer';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../utils/ThemeContext';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
    const { currentTheme } = useTheme();
    const theme = useMuiTheme();

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(address, city, postalCode, country);
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };
  if (currentTheme === 'bootstrap') {
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}


return( <Box sx={{ py: 4 }}>
      <MuiCheckoutSteps step1 step2 />
      
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
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
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
              <LocationIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Shipping Address
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Where should we deliver your order?
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={submitHandler}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Street Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      label="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  label="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />

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
                    mt: 3,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
                    },
                  }}
                >
                  Continue to Payment
                </MuiButton>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </MuiContainer>
    </Box>
  );
};




export default ShippingScreen;
