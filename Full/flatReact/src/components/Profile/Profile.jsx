import React, { useEffect, useState } from "react";
import API from "../../services/api";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, redirecting to login...");
        navigate("/login");
        return;
      }

      try {
        const { data } = await API.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Exclude sensitive fields
        const sanitizedData = Object.keys(data).reduce((acc, key) => {
          if (!["_id", "favouriteFlats", "__v"].includes(key)) {
            acc[key] = data[key];
          }
          return acc;
        }, {});

        setUserData(sanitizedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };
    fetchUserData();
  }, [navigate]);

  if (!userData) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h5" align="center" gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" className="custom-container slide-in-left">
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(userData).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{value || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button
          component={Link}
          to="/profile/update"
          variant="contained"
          color="primary"
        >
          Edit Profile
        </Button>
      </Grid>
    </Container>
  );
};

export default Profile;