// C:\Users\Cristian Iordache\Desktop\Teme.html\githab\desktop-tutorial\Full\flatReact\src\components\Profile\ProfileUpdate.jsx

import React, { useEffect, useState } from "react";
import API from "../../services/api";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Schema de validare folosind Yup
const validationSchema = yup.object({
  // Adaugă reguli de validare, dacă este necesar
});

const ProfileUpdate = () => {
  const [userData, setUserData] = useState({});
  const [confirmationOpen, setConfirmationOpen] = useState(false); // Dialog de confirmare
  const navigate = useNavigate();

  // Fetch datele utilizatorului
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await API.get("/users/profile");
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile data.");
      }
    };
    fetchUserData();
  }, []);

  const formik = useFormik({
    initialValues: userData,
    validationSchema, // Integrare schema Yup
    enableReinitialize: true,
    onSubmit: () => {
      setConfirmationOpen(true); // Deschide dialogul de confirmare
    },
  });

  const handleConfirmUpdate = async () => {
    setConfirmationOpen(false); // Închide dialogul de confirmare
    try {
      await API.patch(`/users/${userData._id}`, formik.values); // Actualizare profil prin API
      toast.success("Profile updated successfully!");
      navigate("/profile"); // Redirecționare către pagina de profil
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

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
    <Container maxWidth="sm" className="custom-container slide-in-right">
      <Typography variant="h4" gutterBottom>
        Update Profile
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {/* Maparea câmpurilor din userData pentru afișare și editare */}
            {Object.keys(userData)
              .filter((key) => key !== "password") // Exclude câmpul `password`
              .map((key) => (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    name={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)} // Prima literă mare
                    value={formik.values[key] || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched[key] && Boolean(formik.errors[key])}
                    helperText={formik.touched[key] && formik.errors[key]}
                    fullWidth
                  />
                </Grid>
              ))}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {/* Dialog de confirmare */}
      <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to save these changes?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmUpdate} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfileUpdate;
