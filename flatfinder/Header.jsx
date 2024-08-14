import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from './src/context/AuthContext';
import { signOut, deleteUser } from 'firebase/auth';
import { auth, db } from './src/services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Header = () => {
  const { currentUser, isAdmin } = useAuth();
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const { firstName, lastName } = userData;
            setFullName(`${firstName} ${lastName}`);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await deleteUser(auth.currentUser);
        alert("Your account has been deleted.");
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  const activeLinkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    borderBottom: '2px solid #ffeb3b',  // Yellow bar under the active link
    fontWeight: 'bold',
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <NavLink to="/" style={linkStyle}>FlatFinder</NavLink>
        </Typography>
        {currentUser ? (
          <>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Hello, {fullName || 'User'}
            </Typography>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              <Button color="inherit">Home</Button>
            </NavLink>
            <NavLink
              to="/profile"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              <Button color="inherit">My Profile</Button>
            </NavLink>
            <NavLink
              to="/favorites"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              <Button color="inherit">Favorites</Button>
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/admin/users"
                style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
              >
                <Button color="inherit">All Users</Button>
              </NavLink>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            <Button color="inherit" onClick={handleDeleteAccount}>Delete Account</Button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              <Button color="inherit">Login</Button>
            </NavLink>
            <NavLink
              to="/register"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              <Button color="inherit">Register</Button>
            </NavLink>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
