// FavoriteFlats.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import API from "../../services/api";
import { toast } from "react-toastify";

const FavoriteFlats = () => {
  const [favoriteFlats, setFavoriteFlats] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await API.get("/users/favorites");
        setFavoriteFlats(data);
      } catch (error) {
        console.error("Error fetching favorites:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Failed to load favorite flats.");
      }
    };
    fetchFavorites();
  }, []);
  

  const handleRemoveFavorite = async (flatId) => {
    try {
      await API.post("/users/favorites/remove", { flatId });
      setFavoriteFlats(favoriteFlats.filter((flat) => flat._id !== flatId));
      toast.success("Flat removed from favorites.");
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast.error("Failed to remove flat from favorites.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Favorite Flats
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flat Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Rent Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favoriteFlats.map((flat) => (
              <TableRow key={flat._id}>
                <TableCell>{flat.flatName}</TableCell>
                <TableCell>{flat.city}</TableCell>
                <TableCell>{flat.rentPrice}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveFavorite(flat._id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FavoriteFlats;