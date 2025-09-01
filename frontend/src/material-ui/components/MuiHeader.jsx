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
  Switch,
  FormControlLabel,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import {
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Receipt as ReceiptIcon,
  People as PeopleIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';

import logo from '../../assets/logo.png';
import SearchBox from '../../components/SearchBox';
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
  
  const { currentTheme, toggleTheme } = useAppTheme();
  
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

  const drawer = (
    <Box sx={{ width: 280, height: '100%' }} role="presentation">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img src={logo} alt="Logo" style={{ height: 32, width: 32 }} />
          <Typography variant="h6" component="div" color="primary" fontWeight="bold">MERN-TESTSHOP</Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} color="inherit"><CloseIcon /></IconButton>
      </Box>

      <List sx={{ pt: 2 }}>
        <ListItem button component={NavLink} to="/cart" onClick={handleDrawerToggle} sx={{ '&.active': { backgroundColor: 'action.selected', '& .MuiListItemIcon-root': { color: 'primary.main' }, '& .MuiListItemText-primary': { color: 'primary.main', fontWeight: 'bold' } } }}>
          <ListItemIcon>
            <Badge badgeContent={cartItemsCount} color="success" showZero={false}><ShoppingCartIcon /></Badge>
          </ListItemIcon>
          <ListItemText primary="سبد خرید" secondary={cartItemsCount > 0 ? `${cartItemsCount} محصول` : 'خالی'} />
        </ListItem>
        <Divider sx={{ my: 1 }} />
        {userInfo ? (<>
          <ListItem sx={{ pb: 1 }}><ListItemIcon><Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>{userInfo.name.charAt(0).toUpperCase()}</Avatar></ListItemIcon><ListItemText primary={userInfo.name} secondary="کاربر وارد شده" primaryTypographyProps={{ fontWeight: 'medium' }} /></ListItem>
          <ListItem button component={NavLink} to="/profile" onClick={handleDrawerToggle} sx={{ '&.active': { backgroundColor: 'action.selected', '& .MuiListItemIcon-root': { color: 'primary.main' }, '& .MuiListItemText-primary': { color: 'primary.main', fontWeight: 'bold' } } }}>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary="پروفایل" />
          </ListItem>
          {userInfo.isAdmin && (<><Divider sx={{ my: 1 }} /><ListItem><ListItemText primary="پنل مدیریت" primaryTypographyProps={{ variant: 'subtitle2', color: 'text.secondary', fontWeight: 'bold' }} /></ListItem>
            <ListItem button component={NavLink} to="/admin/productlist" onClick={handleDrawerToggle} sx={{ pl: 4 }}><ListItemIcon><InventoryIcon /></ListItemIcon><ListItemText primary="محصولات" /></ListItem>
            <ListItem button component={NavLink} to="/admin/orderlist" onClick={handleDrawerToggle} sx={{ pl: 4 }}><ListItemIcon><ReceiptIcon /></ListItemIcon><ListItemText primary="سفارشات" /></ListItem>
            <ListItem button component={NavLink} to="/admin/users" onClick={handleDrawerToggle} sx={{ pl: 4 }}><ListItemIcon><PeopleIcon /></ListItemIcon><ListItemText primary="کاربران" /></ListItem>
          </>)}
          <Divider sx={{ my: 1 }} />
          <ListItem button onClick={() => { logoutHandler(); handleDrawerToggle(); }} sx={{ color: 'error.main' }}>
            <ListItemIcon><ExitToAppIcon color="error" /></ListItemIcon><ListItemText primary="خروج" />
          </ListItem>
        </>) : (<ListItem button component={NavLink} to="/login" onClick={handleDrawerToggle} sx={{ '&.active': { backgroundColor: 'action.selected', '& .MuiListItemIcon-root': { color: 'primary.main' }, '& .MuiListItemText-primary': { color: 'primary.main', fontWeight: 'bold' } } }}>
          <ListItemIcon><PersonIcon /></ListItemIcon><ListItemText primary="ورود / ثبت نام" /></ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={4} sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider', backdropFilter: 'blur(10px)', '& .MuiToolbar-root': { minHeight: { xs: 56, sm: 64 } } }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box component={NavLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', gap: 1, flexGrow: isMobile ? 1 : 0, mr: isMobile ? 0 : 4 }}>
              <img src={logo} alt="MERN-TESTSHOP Logo" style={{ height: 40, width: 40 }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.main', display: { xs: 'none', sm: 'block' } }}>
                MERN-TESTSHOP
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}><SearchBox /></Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              <IconButton component={NavLink} to="/cart" color="inherit" sx={{ '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }}>
                <Badge badgeContent={cartItemsCount} color="success" showZero={false}><ShoppingCartIcon /></Badge>
              </IconButton>
              {userInfo ? (<>
                <IconButton onClick={handleUserMenuOpen} sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: anchorElUser ? 'action.selected' : 'transparent' }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>{userInfo.name.charAt(0).toUpperCase()}</Avatar>
                  <Typography variant="body2" sx={{ display: { xs: 'none', lg: 'block' } }}>{userInfo.name}</Typography>
                </IconButton>
                <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} PaperProps={{ elevation: 8, sx: { mt: 1, minWidth: 200, '& .MuiMenuItem-root': { px: 2, py: 1.5 } } }}>
                  <MenuItem component={NavLink} to="/profile" onClick={handleCloseUserMenu} sx={{ gap: 2 }}><AccountCircleIcon fontSize="small" />پروفایل</MenuItem>
                  <MenuItem onClick={logoutHandler} sx={{ gap: 2, color: 'error.main' }}><ExitToAppIcon fontSize="small" />خروج</MenuItem>
                </Menu>
                {userInfo.isAdmin && (<>
                  <IconButton onClick={handleAdminMenuOpen} sx={{ bgcolor: anchorElAdmin ? 'action.selected' : 'transparent' }}>
                    <Chip icon={<DashboardIcon />} label="ادمین" size="small" color="secondary" variant="outlined" />
                  </IconButton>
                  <Menu anchorEl={anchorElAdmin} open={Boolean(anchorElAdmin)} onClose={handleCloseAdminMenu} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} PaperProps={{ elevation: 8, sx: { mt: 1, minWidth: 180, '& .MuiMenuItem-root': { px: 2, py: 1.5 } } }}>
                    <MenuItem component={NavLink} to="/admin/productlist" onClick={handleCloseAdminMenu} sx={{ gap: 2 }}><InventoryIcon fontSize="small" />محصولات</MenuItem>
                    <MenuItem component={NavLink} to="/admin/orderlist" onClick={handleCloseAdminMenu} sx={{ gap: 2 }}><ReceiptIcon fontSize="small" />سفارشات</MenuItem>
                    <MenuItem component={NavLink} to="/admin/users" onClick={handleCloseAdminMenu} sx={{ gap: 2 }}><PeopleIcon fontSize="small" />کاربران</MenuItem>
                  </Menu>
                </>)}
              </>) : (<IconButton component={NavLink} to="/login" color="inherit" sx={{ gap: 1, '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }}>
                <PersonIcon /><Typography variant="body2" sx={{ display: { xs: 'none', lg: 'block' } }}>ورود</Typography>
              </IconButton>)}
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
                sx={{ color: 'inherit', ml: 1, display: { xs: 'none', md: 'flex' } }}
              />
            </Box>
            <Box sx={{ display: { md: 'none' }, gap: 1 }}>
              <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
          {isMobile && (<Box sx={{ pb: 1, px: 2 }}><SearchBox /></Box>)}
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, bgcolor: 'background.default' } }}>
        {drawer}
        {/* دکمه سوئیچ تم در منوی کشویی موبایل */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          <FormControlLabel
            control={<Switch checked={currentTheme === 'material-ui'} onChange={toggleTheme} color="secondary" />}
            label={currentTheme === 'material-ui' ? 'MUI' : 'BS'}
            sx={{ color: 'inherit' }}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default MuiHeader;