
//\Full\backend\controllers\flatController.js

exports.getFlatById = async (req, res) => {
    try {
      const flat = await Flat.findById(req.params.id);
      if (!flat) return res.status(404).json({ message: "Flat not found" });
      res.status(200).json(flat);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  