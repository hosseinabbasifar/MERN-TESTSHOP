import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../components/Message';
import Loading from '../components/Loading';
import { useGetOrdersQuery } from '../slices/orderApiSlice';
import { NavLink, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';

//Mui imports

import {
  Container,
  Typography,
  Card,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Paper,
  Stack,
  alpha,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Receipt as ReceiptIcon,
  Visibility as ViewIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

import MuiMessage from '../material-ui/components/MuiMessage';
import MuiLoading from '../material-ui/components/MuiLoading';
import MuiPaginate from '../material-ui/components/MuiPaginate';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../utils/ThemeContext';
const OrderListScreen = () => {
  const { PageNumber } = useParams();
  const { data, isLoading, error, isFetching } = useGetOrdersQuery({
    PageNumber,
  });

  const { currentTheme } = useTheme();
  const theme = useMuiTheme();
    const renderLoadingAndError = () => {
    if (isLoading || isFetching) {
      return currentTheme === 'bootstrap' ? <Loading /> : <MuiLoading message="Loading orders..."/>;
    }
    if (error) {
      const message = error?.data?.message || error.error;
      return currentTheme === 'bootstrap' ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <MuiMessage severity="error">{message}</MuiMessage>
      );
    }
    return null;
  };

  const loadingOrErrorComponent = renderLoadingAndError();
  if (loadingOrErrorComponent) {
    return loadingOrErrorComponent;
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <MuiMessage severity="danger">
          {error?.data?.message || error.error}
        </MuiMessage>
      </Container>
    );
  }
  if (currentTheme === 'bootstrap') {
    return (
      <>
        <h1>Orders</h1>
        {isLoading || isFetching ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.orders &&
                  data.orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user && order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice}</td>
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
                        <NavLink to={`/order/${order._id}`}>
                          <Button variant="light" className="btn-sm">
                            Details
                          </Button>
                        </NavLink>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            {data && (
              <Paginate
                pages={data.pages}
                page={data.page}
                isAdmin={true}
                pageType="orders"
              />
            )}
          </>
        )}
      </>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
            <ReceiptIcon sx={{ fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Order Management
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              {data?.count} orders found
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Orders Table */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
        }}
      >
        <TableContainer>
          <MuiTable>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.02),
                  '& th': {
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  },
                }}
              >
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Payment</TableCell>
                <TableCell align="center">Delivery</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.orders?.map((order) => (
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
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: theme.palette.primary.main,
                          fontSize: '0.8rem',
                        }}
                      >
                        {order.user?.name?.charAt(0).toUpperCase() || (
                          <PersonIcon fontSize="small" />
                        )}
                      </Avatar>
                      <Typography variant="body2" fontWeight={500}>
                        {order.user?.name || 'Unknown User'}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      color="primary"
                    >
                      ${order.totalPrice}
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
                          icon={<CheckIcon />}
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
                        color="error"
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
                          icon={<CheckIcon />}
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
                    <Tooltip title="View Details">
                      <IconButton
                        component={NavLink}
                        to={`/order/${order._id}`}
                        sx={{
                          color: theme.palette.primary.main,
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Card>

      {/* Pagination */}
      {data && (
        <MuiPaginate
          pages={data.pages}
          page={data.page}
          isAdmin={true}
          pageType="orders"
        />
      )}
    </Container>
  );
};

export default OrderListScreen;
