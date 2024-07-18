import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";

function UserDashboard() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userName = params.get("name");

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {userName}!
        </Typography>
        <Typography variant="body1">
          This is your name
        </Typography>
      </Box>
    </Container>
  );
}

export default UserDashboard;
