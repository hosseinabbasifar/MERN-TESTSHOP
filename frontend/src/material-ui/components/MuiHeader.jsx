// MuiHeader.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { logout } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Container,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Chip,
  Button,
  Stack,
  Tooltip,
  Fade,
  alpha,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Inventory as InventoryIcon,
  Receipt as ReceiptIcon,
  People as PeopleIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Home as HomeIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import logo from '../../assets/logo.png';
import MuiSearchBox from './MuiSearchBox';
import { useTheme as useAppTheme } from '../../utils/ThemeContext';

const MuiHeader = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElAdmin, setAnchorElAdmin] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { currentTheme, toggleTheme ,mode,toggleMode} = useAppTheme();

  const cartItemsCount = cartItems.reduce((a, c) => a + c.qty, 0);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      setAnchorElUser(null);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const handleUserMenuOpen = (event) => setAnchorElUser(event.currentTarget);
  const handleAdminMenuOpen = (event) => setAnchorElAdmin(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleCloseAdminMenu = () => setAnchorElAdmin(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Mobile Drawer Content
  const drawer = (
    <Box
      sx={{
        width: 300,
        height: '100%',
        background:
          muiTheme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #1A1F2E 0%, #0F1419 100%)'
            : 'linear-gradient(180deg, #FFFFFF 0%, #FAFBFC 100%)',
      }}
      role="presentation"
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2.5,
          borderBottom: `1px solid ${muiTheme.palette.divider}`,
          background: alpha(muiTheme.palette.primary.main, 0.03),
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              height: 36,
              width: 36,
              filter:
                muiTheme.palette.mode === 'dark' ? 'brightness(1.2)' : 'none',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${muiTheme.palette.primary.main} 0%, ${muiTheme.palette.primary.light} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            MERN-SHOP
          </Typography>
        </Stack>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: alpha(muiTheme.palette.primary.main, 0.08),
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Search Box */}
      <Box sx={{ p: 2 }}>
        <MuiSearchBox />
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Navigation List */}
      <List sx={{ pt: 2, px: 1 }}>
        {/* Home */}
        <ListItem
          button
          component={NavLink}
          to="/"
          onClick={handleDrawerToggle}
          sx={{
            borderRadius: 2,
            mb: 0.5,
            '&.active': {
              backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
              '& .MuiListItemIcon-root': { color: 'primary.main' },
              '& .MuiListItemText-primary': {
                color: 'primary.main',
                fontWeight: 600,
              },
            },
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        {/* Cart */}
        <ListItem
          button
          component={NavLink}
          to="/cart"
          onClick={handleDrawerToggle}
          sx={{
            borderRadius: 2,
            mb: 0.5,
            '&.active': {
              backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
              '& .MuiListItemIcon-root': { color: 'primary.main' },
              '& .MuiListItemText-primary': {
                color: 'primary.main',
                fontWeight: 600,
              },
            },
          }}
        >
          <ListItemIcon>
            <Badge badgeContent={cartItemsCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText
            primary="Shopping Cart"
            secondary={cartItemsCount > 0 ? `${cartItemsCount} items` : 'Empty'}
          />
        </ListItem>

        <Divider sx={{ my: 2, mx: 1 }} />

        {userInfo ? (
          <>
            {/* User Info */}
            <ListItem sx={{ mb: 1 }}>
              <ListItemIcon>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: 'primary.main',
                    fontSize: '1rem',
                  }}
                >
                  {userInfo.name.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={userInfo.name}
                secondary="Logged in"
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>

            {/* Profile */}
            <ListItem
              button
              component={NavLink}
              to="/profile"
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.active': {
                  backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                  '& .MuiListItemText-primary': {
                    color: 'primary.main',
                    fontWeight: 600,
                  },
                },
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>

            {/* Admin Panel */}
            {userInfo.isAdmin && (
              <>
                <Divider sx={{ my: 2, mx: 1 }} />
                <ListItem>
                  <ListItemText
                    primary="Admin Panel"
                    primaryTypographyProps={{
                      variant: 'subtitle2',
                      color: 'text.secondary',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                    }}
                  />
                </ListItem>
                <ListItem
                  button
                  component={NavLink}
                  to="/admin/productlist"
                  onClick={handleDrawerToggle}
                  sx={{ pl: 4, borderRadius: 2, mb: 0.5 }}
                >
                  <ListItemIcon>
                    <InventoryIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItem>
                <ListItem
                  button
                  component={NavLink}
                  to="/admin/orderlist"
                  onClick={handleDrawerToggle}
                  sx={{ pl: 4, borderRadius: 2, mb: 0.5 }}
                >
                  <ListItemIcon>
                    <ReceiptIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItem>
                <ListItem
                  button
                  component={NavLink}
                  to="/admin/users"
                  onClick={handleDrawerToggle}
                  sx={{ pl: 4, borderRadius: 2, mb: 0.5 }}
                >
                  <ListItemIcon>
                    <PeopleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem>
              </>
            )}

            <Divider sx={{ my: 2, mx: 1 }} />

            {/* Logout */}
            <ListItem
              button
              onClick={() => {
                logoutHandler();
                handleDrawerToggle();
              }}
              sx={{
                borderRadius: 2,
                color: 'error.main',
                '&:hover': {
                  backgroundColor: alpha(muiTheme.palette.error.main, 0.08),
                },
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem
            button
            component={NavLink}
            to="/login"
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 2,
              '&.active': {
                backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
                '& .MuiListItemIcon-root': { color: 'primary.main' },
                '& .MuiListItemText-primary': {
                  color: 'primary.main',
                  fontWeight: 600,
                },
              },
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Sign In / Register" />
          </ListItem>
        )}
      </List>

      {/* Theme Toggle in Drawer */}
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={toggleMode}
          startIcon={mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          sx={{
            borderRadius: 3,
            py: 1,
            borderColor: muiTheme.palette.divider,
          }}
        >
          {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Box>
      {/* دکمه سوئیچ تم در منوی کشویی موبایل */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <FormControlLabel
          control={
            <Switch
              checked={currentTheme === 'material-ui'}
              onChange={toggleTheme}
              color="secondary"
            />
          }
          label={currentTheme === 'material-ui' ? 'MUI' : 'BS'}
          sx={{ color: 'inherit' }}
        />
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor:
            muiTheme.palette.mode === 'dark'
              ? alpha(muiTheme.palette.background.paper, 0.95)
              : alpha(muiTheme.palette.background.paper, 0.98),
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${muiTheme.palette.divider}`,
          boxShadow:
            muiTheme.palette.mode === 'dark'
              ? '0 1px 3px 0 rgba(0, 0, 0, 0.3)'
              : '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 64, md: 70 },
              py: 1,
            }}
          >
            {/* Logo and Title */}
            <Box
              component={NavLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                gap: 1.5,
                mr: { xs: 'auto', md: 4 },
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="MERN-SHOP"
                sx={{
                  height: { xs: 36, md: 42 },
                  width: { xs: 36, md: 42 },
                  filter:
                    muiTheme.palette.mode === 'dark'
                      ? 'brightness(1.2)'
                      : 'none',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'rotate(-5deg) scale(1.1)',
                  },
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  fontWeight: 700,
                  fontSize: { sm: '1.1rem', md: '1.25rem' },
                  background: `linear-gradient(135deg, ${muiTheme.palette.primary.main} 0%, ${muiTheme.palette.primary.light} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                MERN-SHOP
              </Typography>
            </Box>

            {/* Search Box - Desktop */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                px: 4,
              }}
            >
              <MuiSearchBox />
            </Box>

            {/* Desktop Navigation */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              {/* Theme Toggle */}
              <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
                <IconButton
                  onClick={toggleMode}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: alpha(
                        muiTheme.palette.primary.main,
                        0.08
                      ),
                    },
                  }}
                >
                  {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Tooltip>

              {/* Cart */}
              <Tooltip title="Shopping Cart">
                <IconButton
                  component={NavLink}
                  to="/cart"
                  sx={{
                    color: 'text.secondary',
                    '&.active': {
                      color: 'primary.main',
                      backgroundColor: alpha(
                        muiTheme.palette.primary.main,
                        0.08
                      ),
                    },
                  }}
                >
                  <Badge
                    badgeContent={cartItemsCount}
                    color="secondary"
                    sx={{
                      '& .MuiBadge-badge': {
                        right: -3,
                        top: 3,
                      },
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {userInfo ? (
                <>
                  {/* User Menu */}
                  <Button
                    onClick={handleUserMenuOpen}
                    startIcon={
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: 'primary.main',
                          fontSize: '0.875rem',
                        }}
                      >
                        {userInfo.name.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    sx={{
                      borderRadius: 3,
                      px: 2,
                      py: 0.75,
                      color: 'text.primary',
                      bgcolor: anchorElUser
                        ? alpha(muiTheme.palette.primary.main, 0.08)
                        : 'transparent',
                      '&:hover': {
                        bgcolor: alpha(muiTheme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        display: { xs: 'none', lg: 'block' },
                        fontWeight: 500,
                      }}
                    >
                      {userInfo.name}
                    </Typography>
                  </Button>

                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    TransitionComponent={Fade}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        mt: 1.5,
                        minWidth: 200,
                        borderRadius: 2,
                        border: `1px solid ${muiTheme.palette.divider}`,
                        boxShadow:
                          muiTheme.palette.mode === 'dark'
                            ? '0 4px 20px rgba(0,0,0,0.3)'
                            : '0 4px 20px rgba(0,0,0,0.08)',
                        '& .MuiMenuItem-root': {
                          borderRadius: 1,
                          mx: 0.5,
                          my: 0.25,
                        },
                      },
                    }}
                  >
                    <MenuItem
                      component={NavLink}
                      to="/profile"
                      onClick={handleCloseUserMenu}
                    >
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={logoutHandler}
                      sx={{ color: 'error.main' }}
                    >
                      <ListItemIcon>
                        <ExitToAppIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </MenuItem>
                  </Menu>

                  {/* Admin Menu */}
                  {userInfo.isAdmin && (
                    <>
                      <Chip
                        icon={<AdminIcon />}
                        label="Admin"
                        onClick={handleAdminMenuOpen}
                        variant="outlined"
                        color="primary"
                        size="medium"
                        sx={{
                          borderRadius: 3,
                          fontWeight: 600,
                          cursor: 'pointer',
                          bgcolor: anchorElAdmin
                            ? alpha(muiTheme.palette.primary.main, 0.08)
                            : 'transparent',
                          '&:hover': {
                            bgcolor: alpha(muiTheme.palette.primary.main, 0.08),
                          },
                        }}
                      />

                      <Menu
                        anchorEl={anchorElAdmin}
                        open={Boolean(anchorElAdmin)}
                        onClose={handleCloseAdminMenu}
                        TransitionComponent={Fade}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            mt: 1.5,
                            minWidth: 180,
                            borderRadius: 2,
                            border: `1px solid ${muiTheme.palette.divider}`,
                            boxShadow:
                              muiTheme.palette.mode === 'dark'
                                ? '0 4px 20px rgba(0,0,0,0.3)'
                                : '0 4px 20px rgba(0,0,0,0.08)',
                            '& .MuiMenuItem-root': {
                              borderRadius: 1,
                              mx: 0.5,
                              my: 0.25,
                            },
                          },
                        }}
                      >
                        <MenuItem
                          component={NavLink}
                          to="/admin/productlist"
                          onClick={handleCloseAdminMenu}
                        >
                          <ListItemIcon>
                            <InventoryIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Products</ListItemText>
                        </MenuItem>
                        <MenuItem
                          component={NavLink}
                          to="/admin/orderlist"
                          onClick={handleCloseAdminMenu}
                        >
                          <ListItemIcon>
                            <ReceiptIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Orders</ListItemText>
                        </MenuItem>
                        <MenuItem
                          component={NavLink}
                          to="/admin/users"
                          onClick={handleCloseAdminMenu}
                        >
                          <ListItemIcon>
                            <PeopleIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Users</ListItemText>
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </>
              ) : (
                <Button
                  component={NavLink}
                  to="/login"
                  variant="contained"
                  startIcon={<PersonIcon />}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(69, 170, 242, 0.2)',
                    },
                  }}
                >
                  Sign In
                </Button>
              )}
            {/* دکمه سوئیچ تم در حالت دسکتاپ */}
            <FormControlLabel
              control={
                <Switch
                  checked={currentTheme === 'material-ui'}
                  onChange={toggleTheme}
                  color="secondary"
                />
              }
              label={currentTheme === 'material-ui' ? 'MUI' : 'BS'}
              sx={{ color: 'inherit', ml: 1 }}
            />
            </Stack>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { md: 'none' } }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{
                  ml: 1,
                  '&:hover': {
                    backgroundColor: alpha(muiTheme.palette.primary.main, 0.08),
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 300,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default MuiHeader;
