//Full\backend\controllers\flatController.js


const Flat = require('../models/Flat');

exports.createFlat = async (req, res) => {
  try {
    const flatData = { ...req.body, ownerId: req.user.id }; // Adaugă ID-ul utilizatorului din token
    const newFlat = new Flat(flatData);

    await newFlat.save();
    res.status(201).json(newFlat);
  } catch (error) {
    console.error("Eroare la crearea flat-ului:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Obține toate flats
exports.getFlats = async (req, res) => {
  try {
    const flats = await Flat.find();
    res.status(200).json(flats);
  } catch (error) {
    console.error("Eroare la obținerea flat-urilor:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Obține un flat după ID
exports.getFlatById = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) return res.status(404).json({ message: "Flat not found" });
    res.status(200).json(flat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizare flat
exports.updateFlat = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFlat = await Flat.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedFlat) return res.status(404).json({ message: "Flat not found" });
    res.status(200).json(updatedFlat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ștergere flat
exports.deleteFlat = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFlat = await Flat.findByIdAndDelete(id);
    if (!deletedFlat) return res.status(404).json({ message: "Flat not found" });
    res.status(200).json({ message: "Flat deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
