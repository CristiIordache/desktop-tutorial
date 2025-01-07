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
const validationSchema = yup.object({});

const ProfileUpdate = () => {
  const [userData, setUserData] = useState({});
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await API.get("/users/profile");
        const sanitizedData = Object.keys(data).reduce((acc, key) => {
          if (!["_id", "favouriteFlats", "__v"].includes(key)) {
            acc[key] = data[key];
          }
          return acc;
        }, {});
        setUserData(sanitizedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile data.");
      }
    };
    fetchUserData();
  }, []);

  const formik = useFormik({
    initialValues: userData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: () => {
      setConfirmationOpen(true);
    },
  });

  const handleConfirmUpdate = async () => {
    setConfirmationOpen(false);
    try {
      console.log("Form data to be sent:", formik.values);
      await API.patch(`/users/profile`, formik.values);
      toast.success("Profile updated successfully!");
      navigate("/profile");
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
            {Object.keys(userData).map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  name={key}
                  label={
                    key === "isAdmin"
                      ? "Admin Status"
                      : key.charAt(0).toUpperCase() + key.slice(1)
                  }
                  value={
                    key === "isAdmin"
                      ? userData[key]
                        ? "Yes"
                        : "No"
                      : formik.values[key] || ""
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[key] && Boolean(formik.errors[key])}
                  helperText={formik.touched[key] && formik.errors[key]}
                  fullWidth
                  disabled={key === "isAdmin"}
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