//C:\Users\Cristian Iordache\Desktop\Teme.html\githab\desktop-tutorial\Full\backend\routes\userRoutes.js

const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// Rutele pentru autentificare și utilizator
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.patch("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

router.patch('/profile', authMiddleware, updateUser);



// Rutele pentru favorite
// router.post("/favorites/add", authMiddleware, addToFavorites); // Adaugă un apartament la favorite
// router.post("/favorites/remove", authMiddleware, removeFromFavorites); // Elimină un apartament din favorite
// router.get("/favorites", authMiddleware, getFavorites); // Obține lista apartamentelor favorite
router.post("/favorites/add", authMiddleware, addToFavorites); // Adaugă la favorite
router.post("/favorites/remove", authMiddleware, removeFromFavorites); // Elimină din favorite
router.get("/favorites", authMiddleware, getFavorites); // Obține apartamentele favorite

module.exports = router;
