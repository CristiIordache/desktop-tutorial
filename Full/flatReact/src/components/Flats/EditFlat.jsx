import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Typography, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Schema de validare pentru formular
const validationSchema = yup.object({
  flatName: yup.string().required('Flat name is required'),
  city: yup.string().required('City is required'),
  streetName: yup.string().required('Street name is required'),
  streetNumber: yup.string().required('Street number is required'),
  yearBuilt: yup.number().required('Year built is required').positive('Year must be positive').integer('Year must be an integer'),
  rentPrice: yup.number().required('Rent price is required').positive('Price must be positive'),
  dateAvailable: yup.date().required('Date available is required'),
  hasAC: yup.boolean(),
});

const EditFlat = () => {
  const [flats, setFlats] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const navigate = useNavigate();

  // Funcție pentru a aduce toate apartamentele din Firestore
  const fetchFlats = async () => {
    try {
      if (auth.currentUser) {
        const q = query(collection(db, 'apartments'), where('uid', '==', auth.currentUser.uid));
        const flatsCollection = await getDocs(q);
        const flatsList = flatsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFlats(flatsList);
      }
    } catch (error) {
      console.error('Error fetching flats: ', error);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  useEffect(() => {
    if (selectedFlat) {
      const flat = flats.find((f) => f.id === selectedFlat);
      if (flat) {
        formik.setValues(flat);
      }
    }
  }, [selectedFlat, flats]);

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
    enableReinitialize: true,
    onSubmit: async () => {
      setConfirmationOpen(true);
    },
  });

  const handleConfirmUpdate = async () => {
    setConfirmationOpen(false);
    try {
      const flatDoc = doc(db, 'apartments', selectedFlat);
      await updateDoc(flatDoc, formik.values);
      toast.success('Flat updated successfully!');
      fetchFlats();
      setOpen(false);
    } catch (error) {
      console.error('Error updating document: ', error);
      toast.error('Error updating flat.');
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedFlat) return;
      const flatDoc = doc(db, 'apartments', selectedFlat);
      await deleteDoc(flatDoc);
      toast.success('Flat deleted successfully!');
      setOpen(false);
      fetchFlats();
    } catch (error) {
      console.error('Error deleting document: ', error);
      toast.error('Error deleting flat.');
    }
  };

  const handleFlatSelect = (flat) => {
    setSelectedFlat(flat.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const columns = [
    { field: 'flatName', headerName: 'Flat Name', width: 150 },
    { field: 'city', headerName: 'City', width: 100 },
    { field: 'streetName', headerName: 'Street Name', width: 150 },
    { field: 'streetNumber', headerName: 'Street Number', width: 130 },
    { field: 'yearBuilt', headerName: 'Year Built', width: 120 },
    { field: 'rentPrice', headerName: 'Rent Price', width: 120 },
    { field: 'dateAvailable', headerName: 'Date Available', width: 150 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleFlatSelect(params.row)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Grid container spacing={2} style={{ marginBottom: '20px', marginTop: '20px' }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => navigate('/flats/new')}>
            Add New Flat
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => navigate('/flats/1')}>
            View Flats
          </Button>
        </Grid>
      </Grid>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Manage Flats
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={flats} columns={columns} pageSize={5} />
        </div>
      </Paper>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Flat</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="flatName"
                  label="Flat Name"
                  fullWidth
                  value={formik.values.flatName}
                  onChange={formik.handleChange}
                  error={formik.touched.flatName && Boolean(formik.errors.flatName)}
                  helperText={formik.touched.flatName && formik.errors.flatName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  label="City"
                  fullWidth
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="hasAC"
                      checked={formik.values.hasAC}
                      onChange={(e) => formik.setFieldValue('hasAC', e.target.checked)}
                    />
                  }
                  label="Has AC"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary">
            Update Flat
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete Flat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditFlat;
