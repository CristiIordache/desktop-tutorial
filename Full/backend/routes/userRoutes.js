//\Full\backend\routes\userRoutes.js

const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile, // Adaugă getUserProfile aici
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { addToFavorites } = require('../controllers/userController');
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile); // Folosește funcția importată
router.get("/", authMiddleware, adminMiddleware, getAllUsers); // Admin only
router.get("/:id", authMiddleware, getUserById); // User or Admin
router.patch("/:id", authMiddleware, updateUser); // Admin or Account Owner
router.delete("/:id", authMiddleware, deleteUser); // Admin or Account Owner
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.post('/favorites', authMiddleware, addToFavorites); // Adaugă apartamentul la favorite
module.exports = router;
