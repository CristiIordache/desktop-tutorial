import React, { useState, useEffect } from "react";
import API from "../../services/api";
import {
  Checkbox,
  Modal,
  Box,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"; // Corectat
import { FavoriteBorder, Favorite, BookmarkBorder, Bookmark } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FlatView = () => {
  const [flats, setFlats] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [openMessageBar, setOpenMessageBar] = useState(false);
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

  const handleSelectFlat = (flat) => {
    setSelectedFlat(flat);
    setOpenMessageBar(true);
  };

  const handleCloseMessageBar = () => {
    setOpenMessageBar(false);
    setSelectedFlat(null);
  };

  const columns = [
    { field: "flatName", headerName: "Flat Name", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "rentPrice", headerName: "Rent Price", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/flats/${params.row._id}/edit`)}
            size="small"
            style={{ marginRight: "10px" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row._id)}
            size="small"
          >
            Delete
          </Button>
        </>
      ),
    },
    {
      field: "favorite",
      headerName: "Favorite",
      flex: 1,
      renderCell: (params) => (
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          checked={favorites.has(params.row._id)}
          onClick={() => handleToggleFavorite(params.row._id)}
        />
      ),
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Flats
      </Typography>
      <div style={{ marginBottom: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/flats/new")}
          style={{ marginRight: "10px" }}
        >
          Add New Flat
        </Button>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={flats} columns={columns} pageSize={5} />
      </div>
      <Modal open={openMessageBar} onClose={handleCloseMessageBar}>
        <Box sx={style}>
          {selectedFlat && (
            <Typography>
              Messaging feature will go here for flat: {selectedFlat.flatName}
            </Typography>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default FlatView;
