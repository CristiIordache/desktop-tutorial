//Full\flatNode\routes\flatRoutes.js

const express = require('express');
const router = express.Router();
const Flat = require('../models/Flat');
const authMiddleware = require('../middleware/authMiddleware');

// Get all flats
router.get('/', async (req, res) => {
    try {
        const flats = await Flat.find();
        res.json(flats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching flats.' });
    }
});

// Get flat by ID
router.get('/:id', async (req, res) => {
    try {
        const flat = await Flat.findById(req.params.id);
        if (!flat) return res.status(404).json({ message: 'Flat not found.' });
        res.json(flat);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching flat.' });
    }
});

// Add new flat (only owners can add)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { city, streetName, streetNumber, areaSize, hasAC, yearBuilt, rentPrice, dateAvailable } = req.body;
        const newFlat = new Flat({
            city,
            streetName,
            streetNumber,
            areaSize,
            hasAC,
            yearBuilt,
            rentPrice,
            dateAvailable,
            ownerId: req.user.id
        });

        await newFlat.save();
        res.status(201).json(newFlat);
    } catch (error) {
        res.status(500).json({ message: 'Error adding flat.', error });
    }
});

// Update flat (only the owner can update)
router.patch('/:id', authMiddleware, async (req, res) => {
    try {
        const flat = await Flat.findById(req.params.id);
        if (!flat) return res.status(404).json({ message: 'Flat not found.' });

        // Check if the user is the owner
        if (flat.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to update this flat.' });
        }

        Object.assign(flat, req.body);
        await flat.save();
        res.json(flat);
    } catch (error) {
        res.status(500).json({ message: 'Error updating flat.' });
    }
});

// Delete flat (only the owner can delete)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const flat = await Flat.findById(req.params.id);
        if (!flat) return res.status(404).json({ message: 'Flat not found.' });

        // Check if the user is the owner
        if (flat.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to delete this flat.' });
        }

        await flat.remove();
        res.json({ message: 'Flat deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting flat.' });
    }
});

module.exports = router;
