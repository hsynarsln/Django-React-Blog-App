import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    displayName: ''
  });

  useEffect(() => {}, []);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {};

  return (
    <AppBar position='fixed' sx={{ bgcolor: grey[800] }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              <Typography style={{ fontFamily: 'Permanent Marker' }} variant='h3' sx={{ my: 1, color: 'white' }}>
                Capstone Project
              </Typography>
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {user?.displayName ? (
                <Typography variant='body1' sx={{ color: 'white', display: 'block' }} style={{ fontFamily: 'Architects Daughter' }}>
                  {user?.displayName.split(' ')[0].toUpperCase()}
                </Typography>
              ) : (
                ''
              )}
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user ? <Avatar alt={user.displayName?.toUpperCase()} src={'/static/images/avatar/2.jpg'} sx={{ bgcolor: blue[500] }} /> : <Avatar alt='Remy Sharp' />}
                </IconButton>
              </Tooltip>
            </div>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user?.displayName ? (
                <div>
                  <MenuItem onClick={() => navigate('/new')}>New</MenuItem>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
                  <MenuItem onClick={() => navigate('/register')}>Register</MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
