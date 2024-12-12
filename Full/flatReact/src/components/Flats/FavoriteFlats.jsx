// C:\Users\Cristian Iordache\Desktop\Teme.html\githab\desktop-tutorial\Full\flatReact\src\components\Flats\FavoriteFlats.jsx

import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";

const FavoriteFlats = () => {
  // State pentru apartamentele favorite
  const [favoriteFlats, setFavoriteFlats] = useState([]);

  // Fetch favorites on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await API.get("/users/favorites");
        setFavoriteFlats(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Failed to load favorite flats.");
      }
    };
    fetchFavorites();
  }, []);

  // Remove flat from favorites
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

  // Definire coloane pentru DataGrid
  const columns = [
    { field: "flatName", headerName: "Flat Name", flex: 1, minWidth: 150 },
    { field: "city", headerName: "City", flex: 1, minWidth: 130 },
    { field: "rentPrice", headerName: "Rent Price", flex: 1, minWidth: 130 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleRemoveFavorite(params.row._id)}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Flats
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={favoriteFlats}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableSelectionOnClick
          getRowId={(row) => row._id}
        />
      </div>
    </Container>
  );
};

export default FavoriteFlats;
