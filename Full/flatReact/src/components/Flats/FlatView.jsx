// FlatView.jsx
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
  Checkbox,
} from "@mui/material";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FlatView = () => {
  const [flats, setFlats] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const { data } = await API.get("/flats");
        setFlats(data);
      } catch (error) {
        console.error("Error fetching flats:", error);
        toast.error("Failed to fetch flats.");
      }
    };
    fetchFlats();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/flats/${id}`);
      setFlats(flats.filter((flat) => flat._id !== id));
      toast.success("Flat deleted successfully!");
    } catch (error) {
      console.error("Error deleting flat:", error);
      toast.error("Failed to delete flat.");
    }
  };

  const handleToggleFavorite = (flatId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = new Set(prevFavorites);
      if (updatedFavorites.has(flatId)) {
        updatedFavorites.delete(flatId);
      } else {
        updatedFavorites.add(flatId);
      }
      return updatedFavorites;
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Flats
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/flats/new")}
        style={{ marginBottom: "20px" }}
      >
        Add New Flat
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flat Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Rent Price</TableCell>
              <TableCell>Favorite</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flats.map((flat) => (
              <TableRow key={flat._id}>
                <TableCell>{flat.flatName}</TableCell>
                <TableCell>{flat.city}</TableCell>
                <TableCell>{flat.rentPrice}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={favorites.has(flat._id)}
                    onChange={() => handleToggleFavorite(flat._id)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/flats/${flat._id}/edit`)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(flat._id)}
                  >
                    Delete
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

export default FlatView;