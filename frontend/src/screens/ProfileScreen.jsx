import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loading from '../components/Loading';
import { useProfileMutation } from '../slices/userApiSlice';
import { useGetUserOrdersQuery } from '../slices/orderApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useTheme } from '../utils/ThemeContext';

import {
  Grid,
  TextField,
  Button as MuiButton,
  Typography,
  Box,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  alpha,
  Avatar,
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import {
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Receipt as ReceiptIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import MuiMessage from '../material-ui/components/MuiMessage';
import MuiLoading from '../material-ui/components/MuiLoading';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const { currentTheme } = useTheme();
  const theme = useMuiTheme();
  const { data: orders, isLoading, error } = useGetUserOrdersQuery();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));

        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (currentTheme === 'bootstrap') {
    return (
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
            {loadingUpdateProfile && <Loading />}
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <Table striped table hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, mx: 'auto' }}>
      <Grid container spacing={4}>
        {/* Profile Update Section */}
        <Grid item xs={12} lg={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              overflow: 'hidden',
              position: 'sticky',
              top: 100,
            }}
          >
            {/* Card Header */}
            <Box
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                color: 'white',
                p: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 100,
                  height: 100,
                  background: alpha('#fff', 0.1),
                  borderRadius: '50%',
                },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: alpha('#fff', 0.2),
                    fontSize: '1.5rem',
                    fontWeight: 600,
                  }}
                >
                  {userInfo?.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    User Profile
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Update your account information
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <CardContent sx={{ p: 3 }}>
              <Box component="form" onSubmit={submitHandler}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    InputProps={{
                      startAdornment: (
                        <LockIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      ),
                      endAdornment: (
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    InputProps={{
                      startAdornment: (
                        <LockIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      ),
                      endAdornment: (
                        <IconButton
                          onClick={handleToggleConfirmPasswordVisibility}
                          edge="end"
                          size="small"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      ),
                    }}
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
                    disabled={loadingUpdateProfile}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: '1rem',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 24px ${alpha(
                          theme.palette.primary.main,
                          0.25
                        )}`,
                      },
                    }}
                  >
                    Update Profile
                  </MuiButton>
                </Stack>

                {loadingUpdateProfile && (
                  <Box sx={{ mt: 2 }}>
                    <MuiLoading message="Updating profile..." />
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Orders Section */}
        <Grid item xs={12} lg={8}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              overflow: 'hidden',
            }}
          >
            {/* Orders Header */}
            <Box
              sx={{
                p: 3,
                borderBottom: `1px solid ${theme.palette.divider}`,
                background: alpha(theme.palette.primary.main, 0.02),
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
                  <ReceiptIcon />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    My Orders
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View and track your order history
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <CardContent sx={{ p: 0 }}>
              {isLoading ? (
                <Box sx={{ p: 4 }}>
                  <MuiLoading message="Loading your orders..." />
                </Box>
              ) : error ? (
                <Box sx={{ p: 3 }}>
                  <MuiMessage severity="danger">
                    {error?.data?.message || error.error}
                  </MuiMessage>
                </Box>
              ) : orders?.length === 0 ? (
                <Box
                  sx={{
                    p: 6,
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  <ReceiptIcon sx={{ fontSize: 64, opacity: 0.3, mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No orders found
                  </Typography>
                  <Typography variant="body2">
                    You haven't placed any orders yet
                  </Typography>
                </Box>
              ) : (
                <TableContainer>
                  <MuiTable sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.02),
                          '& th': {
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                          },
                        }}
                      >
                        <TableCell>Order ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell align="center">Payment</TableCell>
                        <TableCell align="center">Delivery</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order, index) => (
                        <TableRow
                          key={order._id}
                          sx={{
                            '&:hover': {
                              bgcolor: alpha(theme.palette.primary.main, 0.02),
                            },
                            '& td': {
                              borderBottom: `1px solid ${alpha(
                                theme.palette.divider,
                                0.5
                              )}`,
                            },
                          }}
                        >
                          <TableCell>
                            <Typography
                              variant="body2"
                              fontFamily="monospace"
                              sx={{
                                fontSize: '0.8rem',
                                color: theme.palette.text.secondary,
                              }}
                            >
                              #{order._id.substring(0, 8)}...
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2">
                              {new Date(order.createdAt).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                }
                              )}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              ${order.totalPrice.toFixed(2)}
                            </Typography>
                          </TableCell>

                          <TableCell align="center">
                            {order.isPaid ? (
                              <Tooltip
                                title={`Paid on ${new Date(
                                  order.paidAt
                                ).toLocaleDateString()}`}
                              >
                                <Chip
                                  icon={<CheckCircleIcon />}
                                  label="Paid"
                                  color="success"
                                  size="small"
                                  sx={{ borderRadius: 2 }}
                                />
                              </Tooltip>
                            ) : (
                              <Chip
                                icon={<ScheduleIcon />}
                                label="Pending"
                                color="warning"
                                size="small"
                                sx={{ borderRadius: 2 }}
                              />
                            )}
                          </TableCell>

                          <TableCell align="center">
                            {order.isDelivered ? (
                              <Tooltip
                                title={`Delivered on ${new Date(
                                  order.deliveredAt
                                ).toLocaleDateString()}`}
                              >
                                <Chip
                                  icon={<CheckCircleIcon />}
                                  label="Delivered"
                                  color="success"
                                  size="small"
                                  sx={{ borderRadius: 2 }}
                                />
                              </Tooltip>
                            ) : (
                              <Chip
                                icon={<ScheduleIcon />}
                                label="Processing"
                                color="warning"
                                size="small"
                                sx={{ borderRadius: 2 }}
                              />
                            )}
                          </TableCell>

                          <TableCell align="center">
                            <MuiButton
                              component={Link}
                              to={`/order/${order._id}`}
                              variant="outlined"
                              size="small"
                              sx={{
                                borderRadius: 2,
                                fontWeight: 500,
                                minWidth: 80,
                                '&:hover': {
                                  transform: 'translateY(-1px)',
                                  boxShadow: `0 4px 12px ${alpha(
                                    theme.palette.primary.main,
                                    0.2
                                  )}`,
                                },
                              }}
                            >
                              Details
                            </MuiButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </MuiTable>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ProfileScreen;
