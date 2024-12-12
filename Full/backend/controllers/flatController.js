//\Full\backend\controllers\flatController.js

const Flat = require('../models/Flat');

// Creare flat
exports.createFlat = async (req, res) => {
  try {
    console.log("Flat data primit:", req.body); // Log pentru body-ul cererii
    console.log("Utilizator autentificat:", req.user); // Log pentru utilizatorul conectat

    const flatData = { ...req.body, ownerId: req.user.id }; // Adaugă ID-ul utilizatorului conectat
    console.log("Flat data pregătit pentru salvare:", flatData);

    const newFlat = new Flat(flatData);
    await newFlat.save();
    console.log("Flat salvat cu succes în baza de date:", newFlat);

    res.status(201).json(newFlat);
  } catch (error) {
    console.error("Eroare la crearea flat-ului:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Obține toate flats
exports.getFlats = async (req, res) => {
  try {
    console.log("Cerere pentru obținerea tuturor flats");
    const flats = await Flat.find(); // Găsește toate flats
    console.log("Flats găsite:", flats);
    res.status(200).json(flats);
  } catch (error) {
    console.error("Eroare la obținerea flat-urilor:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Obține un flat după ID
exports.getFlatById = async (req, res) => {
  try {
    console.log("Cerere pentru obținerea flat-ului cu ID:", req.params.id);
    const flat = await Flat.findById(req.params.id); // Preia ID-ul din parametrii cererii
    if (!flat) {
      console.log("Flat nu a fost găsit cu ID-ul:", req.params.id);
      return res.status(404).json({ message: "Flat not found" });
    }
    console.log("Flat găsit:", flat);
    res.status(200).json(flat);
  } catch (error) {
    console.error("Eroare la obținerea flat-ului:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Actualizare flat
exports.updateFlat = async (req, res) => {
  try {
    console.log("Cerere pentru actualizarea flat-ului cu ID:", req.params.id);
    console.log("Date pentru actualizare:", req.body);

    const updatedFlat = await Flat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFlat) {
      console.log("Flat nu a fost găsit pentru actualizare cu ID-ul:", req.params.id);
      return res.status(404).json({ message: "Flat not found" });
    }
    console.log("Flat actualizat cu succes:", updatedFlat);
    res.status(200).json(updatedFlat);
  } catch (error) {
    console.error("Eroare la actualizarea flat-ului:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Ștergere flat
exports.deleteFlat = async (req, res) => {
  try {
    console.log("Cerere pentru ștergerea flat-ului cu ID:", req.params.id);
    const deletedFlat = await Flat.findByIdAndDelete(req.params.id);
    if (!deletedFlat) {
      console.log("Flat nu a fost găsit pentru ștergere cu ID-ul:", req.params.id);
      return res.status(404).json({ message: "Flat not found" });
    }
    console.log("Flat șters cu succes:", deletedFlat);
    res.status(200).json({ message: "Flat deleted successfully" });
  } catch (error) {
    console.error("Eroare la ștergerea flat-ului:", error.message);
    res.status(500).json({ error: error.message });
  }
};
