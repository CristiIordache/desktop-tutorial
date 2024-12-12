// C:\Users\Cristian Iordache\Desktop\Teme.html\githab\desktop-tutorial\Full\flatReact\src\components\Flats\NewFlat.jsx

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../services/api'; // API pentru cereri backend

// Schema de validare cu Yup
const validationSchema = yup.object({
  flatName: yup.string().required('Flat Name is required'),
  city: yup.string().required('City is required'),
  streetName: yup.string().required('Street Name is required'),
  streetNumber: yup.string().required('Street Number is required'),
  yearBuilt: yup.number().integer().required('Year Built is required'),
  rentPrice: yup.number().positive().required('Rent Price is required'),
  dateAvailable: yup.date().required('Date Available is required'),
});

const NewFlat = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      flatName: '',
      city: '',
      streetName: '',
      streetNumber: '',
      yearBuilt: '',
      rentPrice: '',
      dateAvailable: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setOpenDialog(true); // Afișează dialogul de confirmare înainte de a trimite datele
    },
  });

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmPost = async () => {
    try {
      await API.post('/flats', formik.values); // Trimite datele la backend
      toast.success('Flat added successfully!');
      setOpenDialog(false);
      navigate('/flats'); // Navighează la lista de apartamente
    } catch (error) {
      console.error('Error adding flat:', error);
      toast.error('Failed to add flat.');
    }
  };

  return (
    <Container maxWidth="sm" className="custom-container zoom-in">
      <Typography variant="h4" gutterBottom>
        Add New Flat
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="flatName"
              label="Flat Name"
              value={formik.values.flatName}
              onChange={formik.handleChange}
              error={formik.touched.flatName && Boolean(formik.errors.flatName)}
              helperText={formik.touched.flatName && formik.errors.flatName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="streetName"
              label="Street Name"
              value={formik.values.streetName}
              onChange={formik.handleChange}
              error={formik.touched.streetName && Boolean(formik.errors.streetName)}
              helperText={formik.touched.streetName && formik.errors.streetName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="streetNumber"
              label="Street Number"
              value={formik.values.streetNumber}
              onChange={formik.handleChange}
              error={formik.touched.streetNumber && Boolean(formik.errors.streetNumber)}
              helperText={formik.touched.streetNumber && formik.errors.streetNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="yearBuilt"
              label="Year Built"
              type="number"
              value={formik.values.yearBuilt}
              onChange={formik.handleChange}
              error={formik.touched.yearBuilt && Boolean(formik.errors.yearBuilt)}
              helperText={formik.touched.yearBuilt && formik.errors.yearBuilt}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="rentPrice"
              label="Rent Price"
              type="number"
              value={formik.values.rentPrice}
              onChange={formik.handleChange}
              error={formik.touched.rentPrice && Boolean(formik.errors.rentPrice)}
              helperText={formik.touched.rentPrice && formik.errors.rentPrice}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="dateAvailable"
              label="Date Available"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.dateAvailable}
              onChange={formik.handleChange}
              error={formik.touched.dateAvailable && Boolean(formik.errors.dateAvailable)}
              helperText={formik.touched.dateAvailable && formik.errors.dateAvailable}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Flat
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Dialog de confirmare */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Posting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to post this apartment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            No
          </Button>
          <Button onClick={handleConfirmPost} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NewFlat;
