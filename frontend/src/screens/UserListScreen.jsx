import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';
import Message from '../components/Message';
import Loading from '../components/Loading';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../slices/userApiSlice';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Paginate from '../components/Paginate';

// Mui imports
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
  Button as MuiButton,
  Box,
  Paper,
  Stack,
  alpha,
  Avatar,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  People as PeopleIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import MuiLoading from '../material-ui/components/MuiLoading';
import MuiMessage from '../material-ui/components/MuiMessage';
import MuiPaginate from '../material-ui/components/MuiPaginate';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../utils/ThemeContext';

const UserListScreen = () => {
  const { PageNumber } = useParams();
  const { data, isLoading, isFetching, error, refetch } = useGetUsersQuery({
    PageNumber,
  });
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const navigate = useNavigate();

  const createUserHandler = () => {
    navigate('/admin/users/create');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id).unwrap();
        refetch();
        toast.success('User deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const { currentTheme } = useTheme();
  const theme = useMuiTheme();

  const renderLoadingAndError = () => {
  if (isLoading || isFetching || loadingDelete) {
    return currentTheme === 'bootstrap' ? <Loading /> : <MuiLoading />;
  }
  if (error) {
    const message = error?.data?.message || error.error;
    return currentTheme === 'bootstrap' ? (
      <Message variant="danger">{message}</Message>
    ) : (
      <MuiMessage severity="error" message="Loading Users...">{message}</MuiMessage>
    );
  }
  return null;
};

  useEffect(() => {
    refetch();
  }, [refetch]);

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
        <Row className="align-items-center">
          <Col>
            <h1>Users</h1>
          </Col>
          <Col className="text-end">
            <Button className="my-3" onClick={createUserHandler}>
              <FaPlus /> Create User
            </Button>
          </Col>
        </Row>
        {loadingDelete && <Loading />}
        {isLoading || isFetching ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error || 'An error occurred'}
          </Message>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.users?.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <FaCheck style={{ color: 'green' }} />
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      <NavLink to={`/admin/users/${user._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </NavLink>
                      <Button
                        variant="outline-danger"
                        className="btn-sm"
                        onClick={() => handleDelete(user._id)}
                      >
                        <FaTrash style={{ color: 'red' }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate
              pages={data.pages}
              page={data.page}
              isAdmin={true}
              pageType="users"
            />
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
          background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.light} 100%)`,
          color: theme.palette.warning.contrastText,
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
          direction="row"
          alignItems="center"
          justifyContent="space-between"
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
              <PeopleIcon sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                User Management
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {data?.count} users found
              </Typography>
            </Box>
          </Stack>

          <MuiButton
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={createUserHandler}
            sx={{
              bgcolor: alpha('#fff', 0.2),
              color: theme.palette.warning.contrastText,
              border: `1px solid ${alpha('#fff', 0.3)}`,
              '&:hover': {
                bgcolor: alpha('#fff', 0.3),
                transform: 'translateY(-2px)',
              },
            }}
          >
            Create User
          </MuiButton>
        </Stack>
      </Paper>

      {loadingDelete && <MuiLoading message="Deleting user..." />}

      {/* Users Table */}
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
                  bgcolor: alpha(theme.palette.warning.main, 0.02),
                  '& th': {
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  },
                }}
              >
                <TableCell>User</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.users?.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{
                    '&:hover': {
                      bgcolor: alpha(theme.palette.warning.main, 0.02),
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
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: user.isAdmin
                          ? theme.palette.warning.main
                          : theme.palette.primary.main,
                        fontSize: '1rem',
                      }}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body1" fontWeight={500}>
                      {user.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      #{user._id.substring(0, 8)}...
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      component="a"
                      href={`mailto:${user.email}`}
                      variant="body2"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {user.email}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    {user.isAdmin ? (
                      <Chip
                        icon={<AdminIcon />}
                        label="Admin"
                        color="warning"
                        size="small"
                        sx={{ borderRadius: 2 }}
                      />
                    ) : (
                      <Chip
                        label="User"
                        color="default"
                        size="small"
                        sx={{ borderRadius: 2 }}
                      />
                    )}
                  </TableCell>

                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="Edit User">
                        <IconButton
                          component={NavLink}
                          to={`/admin/users/${user._id}/edit`}
                          sx={{
                            color: theme.palette.primary.main,
                            '&:hover': {
                              bgcolor: alpha(theme.palette.primary.main, 0.08),
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete User">
                        <IconButton
                          onClick={() => handleDelete(user._id)}
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Card>

      {/* Pagination */}
      <MuiPaginate
        pages={data.pages}
        page={data.page}
        isAdmin={true}
        pageType="users"
      />
    </Container>
  );
};

export default UserListScreen;
