// C:\Users\Cristian Iordache\Desktop\Teme.html\githab\desktop-tutorial\Full\flatReact\src\components\Profile\Profile.jsx

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
  const [userData, setUserData] = useState(null); // Starea pentru datele utilizatorului
  const navigate = useNavigate();

  // Fetch datele utilizatorului la montarea componentei
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, redirecting to login...");
        navigate("/login"); // Redirectează la login dacă nu există token
        return;
      }

      try {
        const { data } = await API.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Apelează API-ul pentru a obține datele utilizatorului
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error); // Log erorile
        navigate("/login"); // Redirectează la login în caz de eroare
      }
    };
    fetchUserData();
  }, [navigate]);

  // Afișează mesajul de încărcare dacă datele nu sunt încă disponibile
  if (!userData) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h5" align="center" gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  // Filtrează câmpurile sensibile precum `password`
  const filteredData = Object.entries(userData).filter(
    ([key]) => key !== "password"
  );

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
            {/* Afișează fiecare câmp și valoarea acestuia */}
            {filteredData.map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{value || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Buton pentru a naviga la pagina de actualizare a profilului */}
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