const express = require('express');
const { getFlats, createFlat, updateFlat, deleteFlat, getFlatById } = require('../controllers/flatController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Log pentru înregistrarea rutelor
console.log("Înregistrare rute pentru flats");

// Rutele pentru flats
router.get('/', getFlats); // Obține toate flats
router.post('/', authMiddleware, createFlat); // Adaugă un flat
router.put('/:id', authMiddleware, updateFlat); // Actualizează un flat
router.delete('/:id', authMiddleware, deleteFlat); // Șterge un flat
router.get('/:id', getFlatById); // Obține un flat după ID

module.exports = router;
