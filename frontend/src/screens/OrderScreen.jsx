import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loading from '../components/Loading';

import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from '../slices/orderApiSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

///////Mui Imports
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card as MuiCard,
  CardContent,
  Divider,
  Button as MuiButton,
  Chip,
  Avatar,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  alpha,
  Container,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import {
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  ShoppingBag as ShoppingBagIcon,
  AdminPanelSettings as AdminIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import MuiMessage from '../material-ui/components/MuiMessage';
import MuiLoading from '../material-ui/components/MuiLoading';
import { useTheme } from '../utils/ThemeContext';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const { userInfo } = useSelector((state) => state.auth);
  const { currentTheme } = useTheme();
  const theme = useMuiTheme();

  const [payOrder] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success('Order is paid');
  }

  const deliverHandler = async () => {
    await deliverOrder({ orderId });
    refetch();
    toast.success('Order is Delivered');
  };
  if (currentTheme === 'bootstrap') {
    return isLoading ? (
      <Loading />
    ) : error ? (
      <Message variant="danger">
        {error?.data?.message || error?.error || 'An error occurred'}
      </Message>
    ) : (
      <>
        <h1>Order {order._id}</h1>

        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>{' '}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address:</strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
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
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <div>
                        <Button
                          style={{ marginBottom: '10px' }}
                          onClick={onApproveTest}
                        >
                          Test Pay Order
                        </Button>
                      </div>
                    )}
                  </ListGroup.Item>
                )}

                {loadingDeliver && <Loading />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverHandler}
                      >
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    );
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(order._id);
    toast.success('Order ID copied to clipboard');
  };
  if (isLoading) return <MuiLoading message="Loading order details..." />;

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <MuiMessage severity="danger">
          {error?.data?.message || error?.error || 'An error occurred'}
        </MuiMessage>
      </Container>
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
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems="center"
        >
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: alpha('#fff', 0.15),
              backdropFilter: 'blur(10px)',
            }}
          >
            <ReceiptIcon sx={{ fontSize: 32 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Order Details
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                variant="body1"
                sx={{ fontFamily: 'monospace', opacity: 0.9 }}
              >
                #{order._id}
              </Typography>
              <Tooltip title="Copy Order ID">
                <IconButton
                  size="small"
                  onClick={copyOrderId}
                  sx={{
                    color: 'white',
                    opacity: 0.8,
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <CopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
          <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            <Typography variant="h5" fontWeight={600}>
              ${order.totalPrice}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Total Amount
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {/* Main Content */}
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
                    Shipping Information
                  </Typography>
                </Stack>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <PersonIcon
                          sx={{ color: 'text.secondary', fontSize: 20 }}
                        />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Customer Name
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {order.user.name}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <EmailIcon
                          sx={{ color: 'text.secondary', fontSize: 20 }}
                        />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Email Address
                          </Typography>
                          <Typography
                            variant="body1"
                            component="a"
                            href={`mailto:${order.user.email}`}
                            sx={{
                              color: theme.palette.primary.main,
                              textDecoration: 'none',
                              fontWeight: 500,
                              '&:hover': { textDecoration: 'underline' },
                            }}
                          >
                            {order.user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}
                    >
                      <LocationIcon
                        sx={{ color: 'text.secondary', fontSize: 20, mt: 0.5 }}
                      />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Shipping Address
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {order.shippingAddress.address}
                          <br />
                          {order.shippingAddress.city},{' '}
                          {order.shippingAddress.postalCode}
                          <br />
                          {order.shippingAddress.country}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  {order.isDelivered ? (
                    <Chip
                      icon={<CheckCircleIcon />}
                      label={`Delivered on ${new Date(
                        order.deliveredAt
                      ).toLocaleDateString()}`}
                      color="success"
                      sx={{ borderRadius: 2 }}
                    />
                  ) : (
                    <Chip
                      icon={<ScheduleIcon />}
                      label="Not Delivered"
                      color="warning"
                      sx={{ borderRadius: 2 }}
                    />
                  )}
                </Box>
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
                <Typography variant="body1" fontWeight={500} gutterBottom>
                  Method: {order.paymentMethod}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  {order.isPaid ? (
                    <Chip
                      icon={<CheckCircleIcon />}
                      label={`Paid on ${new Date(
                        order.paidAt
                      ).toLocaleDateString()}`}
                      color="success"
                      sx={{ borderRadius: 2 }}
                    />
                  ) : (
                    <Chip
                      icon={<ScheduleIcon />}
                      label="Not Paid"
                      color="error"
                      sx={{ borderRadius: 2 }}
                    />
                  )}
                </Box>
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
                    <ShoppingBagIcon />
                  </Box>
                  <Typography variant="h6" fontWeight={600}>
                    Order Items ({order.orderItems.length})
                  </Typography>
                </Stack>
              </Box>

              <CardContent sx={{ p: 0 }}>
                {order.orderItems.length === 0 ? (
                  <Box sx={{ p: 4, textAlign: 'center' }}>
                    <ShoppingBagIcon
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
                      Order is empty
                    </Typography>
                  </Box>
                ) : (
                  <List>
                    {order.orderItems.map((item, index) => (
                      <React.Fragment key={index}>
                        <ListItem
                          sx={{
                            py: 2,
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
                                to={`/product/${item.product}`}
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
                              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Qty: {item.qty}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Price: ${item.price}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  fontWeight={600}
                                  color="primary"
                                >
                                  Total: ${(item.qty * item.price).toFixed(2)}
                                </Typography>
                              </Stack>
                            }
                          />
                        </ListItem>
                        {index < order.orderItems.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </MuiCard>
          </Stack>
        </Grid>

        {/* Order Summary Sidebar */}
        <Grid item xs={12} lg={4}>
          <MuiCard
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              position: 'sticky',
              top: 30,
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
              <Typography variant="h6" fontWeight={600}>
                Order Summary
              </Typography>
            </Box>

            <CardContent sx={{ p: 0 }}>
              <List>
                <ListItem>
                  <ListItemText primary="Items" />
                  <Typography fontWeight={600}>${order.itemsPrice}</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Shipping" />
                  <Typography fontWeight={600}>
                    ${order.shippingPrice}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Tax" />
                  <Typography fontWeight={600}>${order.taxPrice}</Typography>
                </ListItem>
                <Divider />
                <ListItem
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="h6" fontWeight={700}>
                        Total
                      </Typography>
                    }
                  />
                  <Typography variant="h6" fontWeight={700} color="primary">
                    ${order.totalPrice}
                  </Typography>
                </ListItem>
              </List>

              {/* Payment Button */}
              {!order.isPaid && (
                <Box sx={{ p: 2 }}>
                  {isLoading ? (
                    <MuiLoading />
                  ) : (
                    <MuiButton
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={onApproveTest}
                      sx={{
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 600,
                        background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme.palette.success.dark} 0%, ${theme.palette.success.main} 100%)`,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 8px 24px ${alpha(
                            theme.palette.success.main,
                            0.25
                          )}`,
                        },
                      }}
                    >
                      Test Pay Order
                    </MuiButton>
                  )}
                </Box>
              )}

              {/* Admin Delivery Button */}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <Box sx={{ p: 2, pt: order.isPaid ? 2 : 0 }}>
                    {loadingDeliver ? (
                      <MuiLoading />
                    ) : (
                      <MuiButton
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={deliverHandler}
                        startIcon={<AdminIcon />}
                        sx={{
                          borderRadius: 2,
                          py: 1.5,
                          fontWeight: 600,
                          bgcolor: theme.palette.warning.main,
                          color: theme.palette.warning.contrastText,
                          '&:hover': {
                            bgcolor: theme.palette.warning.dark,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 24px ${alpha(
                              theme.palette.warning.main,
                              0.25
                            )}`,
                          },
                        }}
                      >
                        Mark As Delivered
                      </MuiButton>
                    )}
                  </Box>
                )}
            </CardContent>
          </MuiCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderScreen;
