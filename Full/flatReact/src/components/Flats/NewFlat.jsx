import React, { useState } from 'react'; 
import { useFormik } from 'formik'; 
import * as yup from 'yup'; 
import { collection, addDoc } from 'firebase/firestore'; 
import { db, auth } from '../../services/firebase'; 
import { TextField, Button, Checkbox, FormControlLabel, Grid, Container, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'; 
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify'; 
import API from '../../services/api';

// Validation schema using Yup
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

  // Formik setup
  const formik = useFormik({
    initialValues: {
      flatName: '',
      city: '',
      streetName: '',
      streetNumber: '',
      hasAC: false,
      yearBuilt: '',
      rentPrice: '',
      dateAvailable: '',
    },
    validationSchema,
    onSubmit: () => {
      setOpenDialog(true); // Open confirmation dialog
    },
  });

  // Close confirmation dialog
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Confirm and post flat data
  const handleConfirmPost = async () => {
    try {
      await addDoc(collection(db, 'apartments'), {
        ...formik.values,
        uid: auth.currentUser.uid,
      });
      toast.success('Apartment posted successfully!');
      setOpenDialog(false);
      navigate('/'); // Redirect to homepage
    } catch (error) {
      console.error('Error adding document:', error);
      toast.error('Failed to post the apartment. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" className="custom-container zoom-in">
      <Typography variant="h4" gutterBottom>
        New Flat
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
            <FormControlLabel
              control={
                <Checkbox
                  name="hasAC"
                  checked={formik.values.hasAC}
                  onChange={formik.handleChange}
                />
              }
              label="Has AC"
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

      {/* Confirmation Dialog */}
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

      {/* Navigation Buttons */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => navigate('/flats/1/edit')} fullWidth>
            Edit Flat
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => navigate('/flats/1')} fullWidth>
            View Flats
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewFlat;
