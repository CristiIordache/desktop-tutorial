import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const EditFlat = () => {
  const [flats, setFlats] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [flatData, setFlatData] = useState({
    flatName: '',
    city: '',
    streetName: '',
    streetNumber: '',
    hasAC: false,
    yearBuilt: '',
    rentPrice: '',
    dateAvailable: '',
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchFlats = async () => {
      const flatsCollection = await getDocs(collection(db, 'apartments'));
      setFlats(flatsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchFlats();
  }, []);

  const handleFlatSelect = (flat) => {
    setSelectedFlat(flat.id);
    setFlatData(flat);
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlatData({
      ...flatData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const flatDoc = doc(db, 'apartments', selectedFlat);
      await updateDoc(flatDoc, flatData);
      alert('Flat updated successfully');
      setOpen(false);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Edit Flat</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flat Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Street Name</TableCell>
              <TableCell>Street Number</TableCell>
              <TableCell>Year Built</TableCell>
              <TableCell>Rent Price</TableCell>
              <TableCell>Date Available</TableCell>
              <TableCell>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flats.map(flat => (
              <TableRow key={flat.id} onClick={() => handleFlatSelect(flat)} style={{ cursor: 'pointer' }}>
                <TableCell>{flat.flatName}</TableCell>
                <TableCell>{flat.city}</TableCell>
                <TableCell>{flat.streetName}</TableCell>
                <TableCell>{flat.streetNumber}</TableCell>
                <TableCell>{flat.yearBuilt}</TableCell>
                <TableCell>{flat.rentPrice}</TableCell>
                <TableCell>{flat.dateAvailable}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleFlatSelect(flat)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Flat</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField name="flatName" label="Flat Name" value={flatData.flatName} onChange={handleChange} fullWidth margin="dense" />
            <TextField name="city" label="City" value={flatData.city} onChange={handleChange} fullWidth margin="dense" />
            <TextField name="streetName" label="Street Name" value={flatData.streetName} onChange={handleChange} fullWidth margin="dense" />
            <TextField name="streetNumber" label="Street Number" value={flatData.streetNumber} onChange={handleChange} fullWidth margin="dense" />
            <TextField name="hasAC" label="Has AC" value={flatData.hasAC} onChange={handleChange} fullWidth margin="dense" />
            <TextField name="yearBuilt" label="Year Built" value={flatData.yearBuilt} onChange={handleChange} fullWidth margin="dense" />
            <TextField name="rentPrice" label="Rent Price" value={flatData.rentPrice} onChange={handleChange} fullWidth margin="dense" />
            <TextField name="dateAvailable" label="Date Available" value={flatData.dateAvailable} onChange={handleChange} fullWidth margin="dense" />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update Flat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditFlat;
