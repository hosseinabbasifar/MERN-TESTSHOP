import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useCreateUserMutation,
} from '../slices/userApiSlice';

import FormContainer from '../components/FormContainer';
import Loading from '../components/Loading';
import Message from '../components/Message';

//Mui imports
import {
  Container,
  TextField,
  Button as MuiButton,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  alpha,
  FormControlLabel,
  Switch,
  Paper,
  Avatar,
  Grid,
  Divider,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Save as SaveIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Lock as LockIcon,
  LockReset as ResetPasswordIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import MuiLoading from '../material-ui/components/MuiLoading';
import MuiMessage from '../material-ui/components/MuiMessage';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../utils/ThemeContext';

const UsersFormScreen = () => {
  const { id: userId } = useParams();
  const isEditMode = Boolean(userId);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);


  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const theme = useMuiTheme();

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserDetailsQuery(userId, {
    skip: !isEditMode,
  });

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const [createUser, { isLoading: loadingCreate }] = useCreateUserMutation();

  useEffect(() => {
    if (isEditMode && user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setIsAdmin(!!user.isAdmin);
    }
  }, [isEditMode, user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await updateUser({ _id: userId, name, email, isAdmin }).unwrap();
        toast.success('User updated successfully');
      } else {
        await createUser({ name, email, password, isAdmin }).unwrap();
        toast.success('User created successfully');
      }
      navigate('/admin/users');
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Something went wrong');
    }
  };

const goBackHandler = () => {
    navigate('/admin/users');
  };

  const handleResetPasswordToggle = () => {
    setResetPassword(!resetPassword);
    if (!resetPassword) {
      setPassword('');
      setConfirmPassword('');
    }
  };


  if (currentTheme === 'bootstrap') {
    return (
      <>
        <Link to="/admin/users" className="btn btn-light my-3">
          Go Back
        </Link>
        <FormContainer>
          <h1>{isEditMode ? 'Edit User' : 'Create User'}</h1>
          {(loadingUpdate || loadingCreate) && <Loading />}
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error || 'An error occurred'}
            </Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group className="my-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="my-2" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              {!isEditMode && (
                <Form.Group className="my-2" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              )}

              <Form.Group className="my-2" controlId="isAdmin">
                <Form.Check
                  type="checkbox"
                  label="Is Admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </Form>
          )}
        </FormContainer>
      </>
    );
  }
   return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.light} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: alpha('#fff', 0.15),
              }}
            >
              {isAdmin ? <AdminIcon sx={{ fontSize: 32 }} /> : <PersonIcon sx={{ fontSize: 32 }} />}
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {isEditMode ? 'Edit User' : 'Create User'}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {isEditMode ? 'Update user information and manage access' : 'Add a new user to the system'}
              </Typography>
            </Box>
          </Stack>

          <MuiButton
            variant="contained"
            startIcon={<BackIcon />}
            onClick={goBackHandler}
            sx={{
              bgcolor: alpha('#fff', 0.2),
              color: 'white',
              border: `1px solid ${alpha('#fff', 0.3)}`,
              '&:hover': {
                bgcolor: alpha('#fff', 0.3),
              },
            }}
          >
            Go Back
          </MuiButton>
        </Stack>
      </Paper>

      {/* Loading States */}
      {(loadingUpdate || loadingCreate) && <MuiLoading message="Saving user..." />}

      {/* Error Message */}
      {error && (
        <MuiMessage severity="danger">
          {error?.data?.message || error.error || 'An error occurred'}
        </MuiMessage>
      )}

      {/* Form */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={submitHandler}>
            <Grid container spacing={4}>
              {/* User Avatar & Role Section */}
              <Grid item xs={12} md={4}>
                <Stack spacing={3} alignItems="center">
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: isAdmin ? theme.palette.warning.main : theme.palette.primary.main,
                      fontSize: '2rem',
                      border: `3px solid ${theme.palette.divider}`,
                    }}
                  >
                    {name ? name.charAt(0).toUpperCase() : <PersonIcon sx={{ fontSize: 40 }} />}
                  </Avatar>
                  
                  {/* Admin Role Toggle */}
                  <Card
                    elevation={0}
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                      p: 2,
                      width: '100%',
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isAdmin}
                          onChange={(e) => setIsAdmin(e.target.checked)}
                          color="warning"
                        />
                      }
                      label={
                        <Typography variant="body1" fontWeight={500}>
                          Administrator Role
                        </Typography>
                      }
                      sx={{
                        m: 0,
                        width: '100%',
                        justifyContent: 'space-between',
                        '& .MuiFormControlLabel-label': {
                          flex: 1,
                        },
                      }}
                    />
                    
                    <Typography 
                      variant="caption" 
                      color={isAdmin ? "warning.main" : "text.secondary"}
                      sx={{ mt: 1, display: 'block' }}
                    >
                      {isAdmin 
                        ? 'Full system access with admin privileges' 
                        : 'Standard user with limited permissions'
                      }
                    </Typography>
                  </Card>

                  {/* Password Reset Section for Edit Mode */}
                  {isEditMode && (
                    <Card
                      elevation={0}
                      sx={{
                        border: `1px solid ${resetPassword ? theme.palette.error.main : theme.palette.divider}`,
                        borderRadius: 2,
                        p: 2,
                        width: '100%',
                        bgcolor: resetPassword ? alpha(theme.palette.error.main, 0.02) : 'transparent',
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <SecurityIcon 
                            color={resetPassword ? 'error' : 'action'} 
                            fontSize="small" 
                          />
                          <Typography variant="body2" fontWeight={500}>
                            Reset Password
                          </Typography>
                        </Stack>
                        <Tooltip title={resetPassword ? 'Cancel password reset' : 'Enable password reset'}>
                          <IconButton
                            onClick={handleResetPasswordToggle}
                            color={resetPassword ? 'error' : 'default'}
                            size="small"
                          >
                            <ResetPasswordIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                      
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        {resetPassword 
                          ? 'User will be required to use the new password' 
                          : 'Click to set a new password for this user'
                        }
                      </Typography>
                    </Card>
                  )}
                </Stack>
              </Grid>

              {/* Form Fields */}
              <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                  {/* Basic Information */}
                  <Typography variant="h6" fontWeight={600} color="text.primary">
                    Basic Information
                  </Typography>
                  
                  <TextField
                    fullWidth
                    label="Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />

                  <TextField
                    fullWidth
                    type="email"
                    label="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />

                  {/* Password Section */}
                  {(!isEditMode || resetPassword) && (
                    <>
                      <Divider sx={{ my: 2 }}>
                        <Typography variant="h6" fontWeight={600} color="text.primary">
                          <LockIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                          {isEditMode ? 'New Password' : 'Password'}
                        </Typography>
                      </Divider>

                      {isEditMode && resetPassword && (
                        <Alert severity="warning" sx={{ borderRadius: 2 }}>
                          <Typography variant="body2">
                            Setting a new password will immediately update the user's credentials. 
                            Make sure to inform the user about their new password.
                          </Typography>
                        </Alert>
                      )}

                      <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        label={`${isEditMode ? 'New ' : ''}Password *`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />

                      <TextField
                        fullWidth
                        type={showConfirmPassword ? 'text' : 'password'}
                        label="Confirm Password *"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          ),
                        }}
                        error={password !== confirmPassword && confirmPassword !== ''}
                        helperText={
                          password !== confirmPassword && confirmPassword !== '' 
                            ? 'Passwords do not match' 
                            : 'Minimum 6 characters required'
                        }
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </>
                  )}

                  {/* Submit Button */}
                  <MuiButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    disabled={loadingUpdate || loadingCreate}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: '1rem',
                      mt: 3,
                      background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.info.dark} 0%, ${theme.palette.info.main} 100%)`,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 24px ${alpha(theme.palette.info.main, 0.25)}`,
                      },
                    }}
                  >
                    {isEditMode 
                      ? (resetPassword ? 'Update User & Reset Password' : 'Update User')
                      : 'Create User'
                    }
                  </MuiButton>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UsersFormScreen;
