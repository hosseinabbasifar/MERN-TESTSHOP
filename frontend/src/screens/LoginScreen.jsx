import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import FormContainer from '../components/FormContainer';

import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

//Mui Imports
import {
  Box,
  TextField,
  Button as MuiButton,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useTheme } from '../utils/ThemeContext';
import MuiContainer from '../material-ui/components/MuiContainer';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';
  const { currentTheme } = useTheme();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (currentTheme === 'bootstrap') {
    return (
      <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button disabled={isLoading} type="submit" variant="primary">
            Sign In
          </Button>

          {isLoading && <Loading />}
        </Form>

        <Row className="py-3">
          <Col>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    );
  }
  return (
    <MuiContainer>
      <Paper variant="Form">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 3,
          }}
        >
          Sign In
        </Typography>

        <Box component="form" onSubmit={submitHandler} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            sx={{ mb: 3 }}
          />

          <MuiButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{
              py: 1.5,
              mb: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Sign In'
            )}
          </MuiButton>
        </Box>

        <Divider sx={{ width: '100%', my: 3 }} />

        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="body2">
              New Customer?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                style={{
                  textDecoration: 'none',
                  color: 'primary.main',
                  fontWeight: 'bold',
                }}
              >
                Register
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </MuiContainer>
  );
};

export default LoginScreen;
