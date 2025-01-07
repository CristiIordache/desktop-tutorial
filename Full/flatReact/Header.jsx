import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from './src/context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const linkStyle = { textDecoration: "none", color: "inherit" };
  const activeLinkStyle = {
    ...linkStyle,
    borderBottom: "2px solid #ffeb3b",
    fontWeight: "bold",
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <NavLink to="/" style={linkStyle}>
            FlatFinder
          </NavLink>
        </Typography>
        {isSmallScreen ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
              {currentUser ? (
                [
                  <MenuItem
                    key="home"
                    onClick={() => handleMenuItemClick("/")}
                  >
                    Home
                  </MenuItem>,
                  <MenuItem
                    key="profile"
                    onClick={() => handleMenuItemClick("/profile")}
                  >
                    Profile
                  </MenuItem>,
                  <MenuItem
                    key="flats"
                    onClick={() => handleMenuItemClick("/flats")}
                  >
                    Flats
                  </MenuItem>,
                  currentUser.isAdmin && (
                    <MenuItem
                      key="all-users"
                      onClick={() => handleMenuItemClick("/admin/users")}
                    >
                      All Users
                    </MenuItem>
                  ),
                  <MenuItem key="logout" onClick={logout}>
                    Logout
                  </MenuItem>,
                ]
              ) : (
                [
                  <MenuItem
                    key="login"
                    onClick={() => handleMenuItemClick("/login")}
                  >
                    Login
                  </MenuItem>,
                  <MenuItem
                    key="register"
                    onClick={() => handleMenuItemClick("/register")}
                  >
                    Register
                  </MenuItem>,
                ]
              )}
            </Menu>
          </>
        ) : (
          <>
            {currentUser ? (
              <>
                <NavLink
                  to="/"
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : linkStyle
                  }
                >
                  <Button color="inherit">Home</Button>
                </NavLink>
                <NavLink
                  to="/profile"
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : linkStyle
                  }
                >
                  <Button color="inherit">Profile</Button>
                </NavLink>
                <NavLink
                  to="/flats"
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : linkStyle
                  }
                >
                  <Button color="inherit">Flats</Button>
                </NavLink>
                {currentUser.isAdmin && (
                  <NavLink
                    to="/admin/users"
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : linkStyle
                    }
                  >
                    <Button color="inherit">All Users</Button>
                  </NavLink>
                )}
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : linkStyle
                  }
                >
                  <Button color="inherit">Login</Button>
                </NavLink>
                <NavLink
                  to="/register"
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : linkStyle
                  }
                >
                  <Button color="inherit">Register</Button>
                </NavLink>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;