
//\Full\backend\controllers\userController.js

const User = require("../models/User"); // MongoDB User model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, birthDate } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // Trimite parola brută; hashing-ul se face în model
      birthDate,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






// Log in a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Caută utilizatorul în baza de date
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("Utilizator găsit în MongoDB:", user); // Debugging

    // Verifică parola
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generează token-ul JWT
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, // Verifică această proprietate
      process.env.JWT_SECRET,
      { expiresIn: "1999999h" }
    );

    console.log("Token generat:", token); // Debugging
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    console.log("Utilizator decodat:", req.user); // Debugging

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user (Admin or Account Owner)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user (Admin or Account Owner)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
