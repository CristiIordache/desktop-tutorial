
//\Full\backend\controllers\userController.js

const User = require("../models/User"); // MongoDB User model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");




exports.addToFavorites = async (req, res) => {
  try {
    const { flatId } = req.body;

    if (!flatId) {
      return res.status(400).json({ message: "Flat ID is required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert all IDs to strings for comparison
    const isAlreadyFavorite = user.favouriteFlats.some((id) => id.toString() === flatId);

    if (isAlreadyFavorite) {
      return res.status(400).json({ message: "Flat is already in favorites" });
    }

    user.favouriteFlats.unshift(flatId); // Adaugă la începutul listei
    await user.save();

    res.status(200).json({ message: "Flat added to favorites", favouriteFlats: user.favouriteFlats });
  } catch (error) {
    console.error("Error adding to favorites:", error.message);
    res.status(500).json({ error: error.message });
  }
  console.log("Request body in addToFavorites:", req.body);
console.log("User favorite flats before adding:", user.favouriteFlats);

};



exports.removeFromFavorites = async (req, res) => {
  try {
    const { flatId } = req.body;
    if (!flatId) {
      return res.status(400).json({ message: "Flat ID is required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out the `flatId` after converting both to strings
    user.favouriteFlats = user.favouriteFlats.filter((id) => id.toString() !== flatId);
    await user.save();

    res.status(200).json({ message: "Flat removed from favorites", favouriteFlats: user.favouriteFlats });
  } catch (error) {
    console.error("Error removing from favorites:", error.message);
    res.status(500).json({ error: error.message });
  }
};


exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favouriteFlats");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.favouriteFlats);
  } catch (error) {
    console.error("Error fetching favorites:", error.message);
    res.status(500).json({ error: error.message });
  }
};





















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
    console.log("Request body:", req.body);
    console.log("Authenticated user ID:", req.user.id);

    const userId = req.user.id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
    if (!updatedUser) {
      console.log("User not found with ID:", userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("Updated user:", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
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



// Adaugă un apartament la favorite
exports.addToFavorites = async (req, res) => {
  try {
    const { flatId } = req.body; // ID-ul apartamentului de adăugat

    console.log("Flat ID primit:", flatId);
    console.log("Utilizator autentificat:", req.user);

    // Verifică dacă utilizatorul este conectat
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("Utilizatorul nu a fost găsit.");
      return res.status(404).json({ message: "User not found" });
    }

    // Verifică dacă apartamentul este deja în lista de favorite
    if (user.favouriteFlats.includes(flatId)) {
      console.log("Apartamentul este deja în lista de favorite.");
      return res.status(400).json({ message: "Flat is already in favorites" });
    }

    // Adaugă apartamentul la lista de favorite
    user.favouriteFlats.push(flatId);
    await user.save();

    console.log("Apartamentul a fost adăugat la favorite:", flatId);
    res.status(200).json({ message: "Flat added to favorites", favouriteFlats: user.favouriteFlats });
  } catch (error) {
    console.error("Eroare la adăugarea apartamentului la favorite:", error.message);
    res.status(500).json({ error: error.message });
  }
};
