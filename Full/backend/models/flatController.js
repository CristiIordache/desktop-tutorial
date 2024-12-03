
//\Full\backend\models\flatController.js

const Flat = require('../models/Flat');

// Get all flats
exports.getFlats = async (req, res) => {
  try {
    const flats = await Flat.find();
    res.status(200).json(flats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new flat
exports.createFlat = async (req, res) => {
  try {
    const newFlat = new Flat(req.body);
    await newFlat.save();
    res.status(201).json(newFlat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a flat
exports.updateFlat = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFlat = await Flat.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedFlat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a flat
exports.deleteFlat = async (req, res) => {
  try {
    const { id } = req.params;
    await Flat.findByIdAndDelete(id);
    res.status(200).json({ message: 'Flat deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

