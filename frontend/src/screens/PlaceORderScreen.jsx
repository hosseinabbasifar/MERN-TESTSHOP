import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loading from '../components/Loading';
import { useCreateOrderMutation } from '../slices/orderApiSlice';
import { resetCart } from '../slices/cartSlice';
//Mui imports

import {
  Grid,
  Container,
  Typography,
  Card as MuiCard,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button as MuiButton,
  Box,
  Stack,
  Divider,
  Paper,
  alpha,
  Chip,
} from '@mui/material';
import {
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  ShoppingBag as OrderIcon,
  Receipt as ReceiptIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import MuiMessage from '../material-ui/components/MuiMessage';
import MuiLoading from '../material-ui/components/MuiLoading';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../utils/ThemeContext';
const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { currentTheme } = useTheme();
  const theme = useMuiTheme();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  // useEffect(() => {
  //   if (!cart.shippingAddress.address) {
  //     navigate('/shipping');
  //   } else if (!cart.paymentMethod) {
  //     navigate('/payment');
  //   }
  // }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  useEffect(() => {
    if (!cart.shippingAddress?.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress?.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(resetCart());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err?.error || 'An error occurred');
    }
  };
  if (currentTheme === 'bootstrap') {
    return (
      <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address:</strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                  {cart.shippingAddress.postalCode},{' '}
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && (
                    <Message variant="danger">
                      {error?.data?.message ||
                        error?.error ||
                        'An error occurred'}
                    </Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                  {isLoading && <Loading />}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      <CheckoutSteps step1 step2 step3 step4 />

      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.light} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -50,
            right: -50,
            width: 150,
            height: 150,
            background: alpha('#fff', 0.1),
            borderRadius: '50%',
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: alpha('#fff', 0.15),
              backdropFilter: 'blur(10px)',
            }}
          >
            <CheckIcon sx={{ fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Review Your Order
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Please review your order details before placing your order
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={4}>
        {/* Order Details */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={3}>
            {/* Shipping Information */}
            <MuiCard
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  p: 2.5,
                  background: alpha(theme.palette.primary.main, 0.02),
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                    }}
                  >
                    <ShippingIcon />
                  </Box>
                  <Typography variant="h6" fontWeight={600}>
                    Shipping Address
                  </Typography>
                </Stack>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Typography variant="body1" fontWeight={500}>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                  {cart.shippingAddress.postalCode},{' '}
                  {cart.shippingAddress.country}
                </Typography>
              </CardContent>
            </MuiCard>

            {/* Payment Method */}
            <MuiCard
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  p: 2.5,
                  background: alpha(theme.palette.secondary.main, 0.02),
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                      color: theme.palette.secondary.main,
                    }}
                  >
                    <PaymentIcon />
                  </Box>
                  <Typography variant="h6" fontWeight={600}>
                    Payment Method
                  </Typography>
                </Stack>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="body1" fontWeight={500}>
                    {cart.paymentMethod}
                  </Typography>
                  <Chip
                    label="Secure"
                    size="small"
                    color="success"
                    sx={{ borderRadius: 1 }}
                  />
                </Stack>
              </CardContent>
            </MuiCard>

            {/* Order Items */}
            <MuiCard
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  p: 2.5,
                  background: alpha(theme.palette.warning.main, 0.02),
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      color: theme.palette.warning.main,
                    }}
                  >
                    <OrderIcon />
                  </Box>
                  <Typography variant="h6" fontWeight={600}>
                    Order Items ({cart.cartItems.length})
                  </Typography>
                </Stack>
              </Box>

              <CardContent sx={{ p: 0 }}>
                {cart.cartItems.length === 0 ? (
                  <Box sx={{ p: 4, textAlign: 'center' }}>
                    <OrderIcon
                      sx={{
                        fontSize: 48,
                        color: 'text.secondary',
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Your cart is empty
                    </Typography>
                  </Box>
                ) : (
                  <List>
                    {cart.cartItems.map((item, index) => (
                      <React.Fragment key={index}>
                        <ListItem sx={{ py: 2 }}>
                          <ListItemAvatar>
                            <Avatar
                              src={item.image}
                              alt={item.name}
                              variant="rounded"
                              sx={{
                                width: 60,
                                height: 60,
                                border: `1px solid ${theme.palette.divider}`,
                              }}
                            />
                          </ListItemAvatar>

                          <ListItemText
                            sx={{ ml: 2 }}
                            primary={
                              <Typography
                                component={Link}
                                to={`/product/${item._id}`}
                                variant="body1"
                                fontWeight={500}
                                sx={{
                                  color: theme.palette.text.primary,
                                  textDecoration: 'none',
                                  '&:hover': {
                                    color: theme.palette.primary.main,
                                    textDecoration: 'underline',
                                  },
                                }}
                              >
                                {item.name}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                              >
                                {item.qty} × ${item.price} = $
                                {(item.qty * item.price).toFixed(2)}
                              </Typography>
                            }
                          />
                        </ListItem>
                        {index < cart.cartItems.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </MuiCard>
          </Stack>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} lg={4}>
          <MuiCard
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              position: 'sticky',
              top: 90,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                p: 2.5,
                background: alpha(theme.palette.success.main, 0.02),
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main,
                  }}
                >
                  <ReceiptIcon />
                </Box>
                <Typography variant="h6" fontWeight={600}>
                  Order Summary
                </Typography>
              </Stack>
            </Box>

            <CardContent sx={{ p: 0 }}>
              <List>
                <ListItem>
                  <ListItemText primary="Items" />
                  <Typography fontWeight={600}>${cart.itemsPrice}</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Shipping" />
                  <Typography fontWeight={600}>
                    ${cart.shippingPrice}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Tax" />
                  <Typography fontWeight={600}>${cart.taxPrice}</Typography>
                </ListItem>
                <Divider />
                <ListItem
                  sx={{
                    bgcolor: alpha(theme.palette.success.main, 0.05),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="h6" fontWeight={700}>
                        Total
                      </Typography>
                    }
                  />
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color="success.main"
                  >
                    ${cart.totalPrice}
                  </Typography>
                </ListItem>
              </List>

              {error && (
                <Box sx={{ p: 2 }}>
                  <MuiMessage severity="danger">
                    {error?.data?.message ||
                      error?.error ||
                      'An error occurred'}
                  </MuiMessage>
                </Box>
              )}

              <Box sx={{ p: 3 }}>
                {isLoading ? (
                  <MuiLoading message="Placing your order..." />
                ) : (
                  <MuiButton
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={cart.cartItems.length === 0}
                    onClick={placeOrderHandler}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: '1rem',
                      background:
                        cart.cartItems.length === 0
                          ? theme.palette.action.disabledBackground
                          : `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                      '&:hover': cart.cartItems.length > 0 && {
                        background: `linear-gradient(135deg, ${theme.palette.success.dark} 0%, ${theme.palette.success.main} 100%)`,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 24px ${alpha(
                          theme.palette.success.main,
                          0.25
                        )}`,
                      },
                    }}
                  >
                    Place Order
                  </MuiButton>
                )}
              </Box>
            </CardContent>
          </MuiCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceOrderScreen;
