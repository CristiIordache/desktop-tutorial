import React, { useState, useEffect } from "react";
import { Checkbox, Modal, Box, useMediaQuery, Container, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FavoriteBorder, Favorite, BookmarkBorder, Bookmark } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import MessageBar from "../Messages/MessageBar";
import { toast } from "react-toastify";

const FlatView = () => {
  const [flats, setFlats] = useState([]);
  const [favoriteFlats, setFavoriteFlats] = useState(new Set());
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [openMessageBar, setOpenMessageBar] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const navigate = useNavigate();

  // Fetch flats from the backend
  const fetchFlats = async () => {
    try {
      const { data } = await API.get("/flats");
      setFlats(data);
    } catch (error) {
      console.error("Error fetching flats:", error);
      toast.error("Failed to fetch flats.");
    }
  };

  // Delete a flat
  const handleDelete = async (id) => {
    try {
      await API.delete(`/flats/${id}`);
      toast.success("Flat deleted successfully!");
      fetchFlats(); // Refresh flats list
    } catch (error) {
      console.error("Error deleting flat:", error);
      toast.error("Failed to delete flat.");
    }
  };

  // Select a flat to view messages or send a message
  const handleSelectFlat = (flat) => {
    setSelectedFlat(flat);
    setOpenMessageBar(true);
  };

  // Close the messaging modal
  const handleCloseMessageBar = () => {
    setOpenMessageBar(false);
    setSelectedFlat(null);
  };

  // Toggle favorite status for a flat
  const handleToggleFavorite = (flat) => {
    const updatedFavorites = new Set(favoriteFlats);
    if (favoriteFlats.has(flat.id)) {
      updatedFavorites.delete(flat.id);
      toast.info("Removed from favorites.");
    } else {
      updatedFavorites.add(flat.id);
      toast.success("Added to favorites!");
    }
    setFavoriteFlats(updatedFavorites);
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  const columns = [
    { field: "flatName", headerName: "Flat Name", flex: 1, minWidth: 150 },
    { field: "city", headerName: "City", flex: 1, minWidth: 130 },
    { field: "streetName", headerName: "Street Name", flex: 1, minWidth: 130 },
    { field: "streetNumber", headerName: "Street Number", flex: 1, minWidth: 130 },
    { field: "hasAC", headerName: "Has AC", flex: 0.5, minWidth: 90, renderCell: (params) => (params.value ? "Yes" : "No") },
    { field: "yearBuilt", headerName: "Year Built", flex: 0.5, minWidth: 110 },
    { field: "rentPrice", headerName: "Rent Price", flex: 0.5, minWidth: 110 },
    { field: "dateAvailable", headerName: "Date Available", flex: 1, minWidth: 150 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Checkbox
          icon={<BookmarkBorder />}
          checkedIcon={<Bookmark />}
          onClick={() => handleSelectFlat(params.row)}
        />
      ),
    },
    {
      field: "favorite",
      headerName: "Favorite",
      flex: 1,
      minWidth: 130,
      renderCell: (params) => (
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          checked={favoriteFlats.has(params.row.id)}
          onClick={() => handleToggleFavorite(params.row)}
        />
      ),
    },
  ];

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? 300 : isTablet ? 500 : 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/flats/new")}
          style={{ marginRight: "10px" }}
        >
          Add New Flat
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate("/flats/1/edit")}>
          Edit Flat
        </Button>
      </div>

      <Container sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 3, p: 3 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          All Flats
        </Typography>
        <div style={{ height: isMobile ? 400 : 500, width: "100%" }}>
          <DataGrid
            rows={flats}
            columns={columns}
            pageSize={isMobile ? 3 : 5}
            rowsPerPageOptions={[3, 5, 10]}
            disableRowSelectionOnClick
          />
        </div>
      </Container>

      <Modal open={openMessageBar} onClose={handleCloseMessageBar}>
        <Box sx={modalStyle}>
          {selectedFlat && <MessageBar flatId={selectedFlat.id} />}
        </Box>
      </Modal>
    </div>
  );
};

export default FlatView;
