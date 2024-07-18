import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Home Page!
        </Typography>
        <Typography variant="body1">
          This is the main page of the Apartment Management system.
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" component={Link} to="/register">
            Register
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/login" sx={{ ml: 2 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
