import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { doSignOut } from '../auth';
import { Button, Typography, Box } from '@mui/material';

function Header() {
  const navigate = useNavigate();
  const { currentUser, userLoggedIn } = useAuth();

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6">Welcome to MyApp</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {userLoggedIn ? (
          <>
            <Typography variant="body1" sx={{ marginRight: '16px' }}>
              Hello, {currentUser.email}
            </Typography>
            <Button
              onClick={() => {
                doSignOut().then(() => {
                  navigate('/login');
                });
              }}
              variant="contained"
              color="secondary"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/login" variant="contained" sx={{ marginRight: '8px' }}>
              Login
            </Button>
            <Button component={Link} to="/register" variant="contained">
              Register
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Header;
