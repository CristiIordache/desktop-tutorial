// C:\Users\Cristian Iordache\Desktop\Teme.html\githab\desktop-tutorial\Full\flatReact\src\components\Flats\EditFlat.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";
import API from "../../services/api";
import { DataGrid } from "@mui/x-data-grid";

const EditFlat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flat, setFlat] = useState(null);
  const [flats, setFlats] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch all flats
  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const { data } = await API.get("/flats");
        setFlats(data);
      } catch (error) {
        console.error("Error fetching flats:", error);
      }
    };
    fetchFlats();
  }, []);

  // Fetch single flat for editing
  useEffect(() => {
    const fetchFlat = async () => {
      if (!id) return;
      try {
        const { data } = await API.get(`/flats/${id}`);
        setFlat(data);
      } catch (error) {
        console.error("Error fetching flat:", error);
      }
    };
    fetchFlat();
  }, [id]);

  const handleEdit = (flatId) => {
    navigate(`/flats/${flatId}/edit`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/flats/${id}`, flat);
      toast.success("Flat updated successfully!");
      navigate("/flats");
    } catch (error) {
      console.error("Error updating flat:", error);
      toast.error("Failed to update flat.");
    }
  };

  const handleDelete = async (flatId) => {
    try {
      await API.delete(`/flats/${flatId}`);
      toast.success("Flat deleted successfully!");
      setFlats(flats.filter((f) => f.id !== flatId));
    } catch (error) {
      console.error("Error deleting flat:", error);
      toast.error("Failed to delete flat.");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  if (!flat && id) return <Typography>Loading...</Typography>;

  const columns = [
    { field: "flatName", headerName: "Flat Name", width: 150 },
    { field: "city", headerName: "City", width: 100 },
    { field: "rentPrice", headerName: "Rent Price", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(params.row.id)}
            size="small"
            style={{ marginRight: "10px" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row.id)}
            size="small"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Manage Flats
      </Typography>
      <div style={{ height: 400, width: "100%", marginBottom: "20px" }}>
        <DataGrid rows={flats} columns={columns} pageSize={5} />
      </div>

      {id && flat && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Flat Name"
                value={flat.flatName}
                onChange={(e) => setFlat({ ...flat, flatName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="City"
                value={flat.city}
                onChange={(e) => setFlat({ ...flat, city: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Rent Price"
                type="number"
                value={flat.rentPrice}
                onChange={(e) => setFlat({ ...flat, rentPrice: e.target.value })}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
            Save Changes
          </Button>
        </form>
      )}

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this flat?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(selectedFlat)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EditFlat;
