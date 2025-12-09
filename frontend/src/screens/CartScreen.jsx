import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

//MUi Imports
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
  IconButton,
  Box,
  Stack,
  Divider,
  Paper,
  alpha,
  Chip,
  Tooltip,
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../utils/ThemeContext';

import {
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  ShoppingBag as BagIcon,
  ArrowForward as ArrowIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { currentTheme } = useTheme();
  const theme = useMuiTheme();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  if (currentTheme === 'bootstrap') {
    return (
      <Row>
        <Col md={8}>
          <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
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
            <CartIcon sx={{ fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Shopping Cart
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} lg={8}>
          {cartItems.length === 0 ? (
            <MuiCard
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                textAlign: 'center',
                py: 8,
              }}
            >
              <BagIcon
                sx={{
                  fontSize: 80,
                  color: 'text.secondary',
                  opacity: 0.3,
                  mb: 3,
                }}
              />
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Your cart is empty
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Discover amazing products and add them to your cart
              </Typography>
              <MuiButton
                component={Link}
                to="/"
                variant="contained"
                size="large"
                startIcon={<ArrowIcon sx={{ transform: 'rotate(180deg)' }} />}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                }}
              >
                Continue Shopping
              </MuiButton>
            </MuiCard>
          ) : (
            <MuiCard
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                overflow: 'hidden',
              }}
            >
              <List>
                {cartItems.map((item, index) => (
                  <React.Fragment key={item._id}>
                    <ListItem
                      sx={{
                        py: 3,
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.02),
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={item.image}
                          alt={item.name}
                          variant="rounded"
                          sx={{
                            width: 80,
                            height: 80,
                            border: `1px solid ${theme.palette.divider}`,
                          }}
                        />
                      </ListItemAvatar>

                      <ListItemText
                        sx={{ ml: 2, flex: 1 }}
                        primary={
                          <Typography
                            component={Link}
                            to={`/product/${item._id}`}
                            variant="h6"
                            fontWeight={600}
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
                          <Box sx={{ mt: 1 }}>
                            <Typography
                              variant="h6"
                              color="primary"
                              fontWeight={600}
                            >
                              ${item.price}
                            </Typography>
                            <Chip
                              label={`${item.countInStock} in stock`}
                              size="small"
                              color="success"
                              sx={{ mt: 1, borderRadius: 1 }}
                            />
                          </Box>
                        }
                      />

                      <Stack direction="row" alignItems="center" spacing={2}>
                        {/* Quantity Control */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            borderRadius: 2,
                            border: `1px solid ${alpha(
                              theme.palette.primary.main,
                              0.2
                            )}`,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              addToCartHandler(item, Math.max(1, item.qty - 1))
                            }
                            disabled={item.qty <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography
                            sx={{
                              minWidth: 40,
                              textAlign: 'center',
                              fontWeight: 600,
                              mx: 1,
                            }}
                          >
                            {item.qty}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() =>
                              addToCartHandler(
                                item,
                                Math.min(item.countInStock, item.qty + 1)
                              )
                            }
                            disabled={item.qty >= item.countInStock}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        {/* Total Price */}
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          color="primary"
                          sx={{ minWidth: 80, textAlign: 'right' }}
                        >
                          ${(item.qty * item.price).toFixed(2)}
                        </Typography>

                        {/* Remove Button */}
                        <Tooltip title="Remove from cart">
                          <IconButton
                            onClick={() => removeFromCartHandler(item._id)}
                            sx={{
                              color: theme.palette.error.main,
                              '&:hover': {
                                bgcolor: alpha(theme.palette.error.main, 0.08),
                                transform: 'scale(1.1)',
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </ListItem>
                    {index < cartItems.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </MuiCard>
          )}
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
              <Typography variant="h6" fontWeight={600}>
                Order Summary
              </Typography>
            </Box>

            <CardContent sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Items ({totalItems})
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      ${totalPrice.toFixed(2)}
                    </Typography>
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6" fontWeight={700}>
                      Subtotal
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="primary">
                      ${totalPrice.toFixed(2)}
                    </Typography>
                  </Stack>
                </Box>

                <MuiButton
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  endIcon={<ArrowIcon />}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    background:
                      cartItems.length === 0
                        ? theme.palette.action.disabledBackground
                        : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    '&:hover': cartItems.length > 0 && {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 24px ${alpha(
                        theme.palette.primary.main,
                        0.25
                      )}`,
                    },
                  }}
                >
                  Proceed To Checkout
                </MuiButton>
              </Stack>
            </CardContent>
          </MuiCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartScreen;
