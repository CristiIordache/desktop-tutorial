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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import API from "../../services/api";

const EditFlat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flat, setFlat] = useState(null);
  const [flats, setFlats] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFlatId, setSelectedFlatId] = useState(null);

  // Format date from ISO to yyyy-MM-dd
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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
        setFlat({
          ...data,
          dateAvailable: formatDate(data.dateAvailable), // Format the date
        });
      } catch (error) {
        console.error("Error fetching flat:", error);
      }
    };
    fetchFlat();
  }, [id]);

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

  const handleDelete = async () => {
    try {
      await API.delete(`/flats/${selectedFlatId}`);
      setFlats(flats.filter((f) => f._id !== selectedFlatId));
      toast.success("Flat deleted successfully!");
      setOpenDialog(false);
    } catch (error) {
      console.error("Error deleting flat:", error);
      toast.error("Failed to delete flat.");
    }
  };

  const handleDialogOpen = (flatId) => {
    setSelectedFlatId(flatId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedFlatId(null);
  };

  if (!flat && id) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Manage Flats
      </Typography>
      <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flat Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Street Name</TableCell>
              <TableCell>Street Number</TableCell>
              <TableCell>Year Built</TableCell>
              <TableCell>Date Available</TableCell>
              <TableCell>Rent Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flats.map((flat) => (
              <TableRow key={flat._id}>
                <TableCell>{flat.flatName}</TableCell>
                <TableCell>{flat.city}</TableCell>
                <TableCell>{flat.streetName}</TableCell>
                <TableCell>{flat.streetNumber}</TableCell>
                <TableCell>{flat.yearBuilt}</TableCell>
                <TableCell>{formatDate(flat.dateAvailable)}</TableCell>
                <TableCell>{flat.rentPrice}</TableCell>
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
                    color="error"
                    onClick={() => handleDialogOpen(flat._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
                label="Street Name"
                value={flat.streetName}
                onChange={(e) => setFlat({ ...flat, streetName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Number"
                value={flat.streetNumber}
                onChange={(e) => setFlat({ ...flat, streetNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Year Built"
                value={flat.yearBuilt}
                onChange={(e) => setFlat({ ...flat, yearBuilt: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date Available"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={flat.dateAvailable}
                onChange={(e) => setFlat({ ...flat, dateAvailable: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Rent Price"
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
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EditFlat;