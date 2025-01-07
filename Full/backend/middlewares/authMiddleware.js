const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importă modelul User

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extrage token-ul din header

  if (!token) {
    console.log("Token lipsă în header-ul Authorization");
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    // Verifică și decodează token-ul JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodat:", decoded);

    // Preia utilizatorul din baza de date
    const user = await User.findById(decoded.id).select("-password"); // Exclude parola
    if (!user) {
      console.log("Utilizatorul nu a fost găsit în baza de date");
      return res.status(404).json({ message: "User not found" });
    }

    // Atașează utilizatorul la obiectul `req`
    req.user = user;
    console.log("Utilizator găsit:", user);
    next();
  } catch (error) {
    console.error("Eroare la verificarea token-ului:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
  console.log("User in authMiddleware:", req.user);

};


module.exports = authMiddleware;
