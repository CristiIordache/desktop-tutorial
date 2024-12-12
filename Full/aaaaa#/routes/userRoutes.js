//Full\flatNode\routes\userRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName, birthDate, isAdmin } = req.body;
    console.log(req.body);
    

    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
      birthDate,
      isAdmin: isAdmin || false // Set to the provided value or default to false if not provided
    });
    
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error registering user." });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in." });
  }
});

module.exports = router;
