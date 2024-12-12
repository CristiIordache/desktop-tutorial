//Full\backend\middlewares\authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importă modelul User

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    console.log("Token lipsă în header-ul Authorization");
    return res.status(403).json({ message: 'No token provided' });
  }
console.log(req.headers['authorization'])
  try {
    const tokenWithoutBearer = token.split(' ')[0];
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    console.log("Token decodat:", decoded);

    // Preia utilizatorul actualizat din baza de date
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("Utilizatorul nu a fost găsit în baza de date");
      return res.status(404).json({ message: 'User not found' });
    }

    // Atașează utilizatorul complet la req.user
    req.user = user;
    console.log("Utilizator găsit în baza de date:", user);
    next();
  } catch (error) {
    console.log("Eroare la verificarea token-ului:", error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};
module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extrage token-ul din header

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error("Invalid token:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};