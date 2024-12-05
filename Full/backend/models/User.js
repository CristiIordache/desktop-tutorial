//\Full\backend\models\User.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  isAdmin: { type: Boolean, default: false },
});

// Middleware-ul `pre` pentru hashing-ul parolei înainte de salvare
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Evită hashing-ul dacă parola nu a fost modificată

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", UserSchema);

