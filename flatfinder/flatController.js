
//\Full\backend\models\flatController.js

const Flat = require('../Full/backend/models/Flat');

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
const Flat = require('../Full/backend/models/Flat');

// Creare flat
exports.createFlat = async (req, res) => {
  try {
    const flatData = { ...req.body, ownerId: req.user.id }; // Include ID-ul proprietarului
    const newFlat = new Flat(flatData);

    await newFlat.save();
    res.status(201).json(newFlat);
  } catch (error) {
    console.error("Eroare la crearea flat-ului:", error.message);
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

    // Verifică dacă utilizatorul este proprietarul
    const flat = await Flat.findById(id);
    if (!flat) return res.status(404).json({ message: "Flat not found" });

    if (flat.ownerId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "You are not authorized to delete this flat" });
    }

    await Flat.findByIdAndDelete(id);
    res.status(200).json({ message: "Flat deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


