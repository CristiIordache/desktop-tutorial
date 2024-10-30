const UserModel = require("../Models/UserModel");
const bcrypt = require('bcrypt'); // Make sure bcrypt is imported at the top
const utils = require('../utils/utils'); 

// Create a new user
exports.createUser = function (req, res, next) {
  let newUser = req.body;
  newUser.create = new Date();
  newUser.modified = new Date();

  let user = new UserModel(newUser);
  user
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
};

// Login user
exports.loginUser = function (req, res, next) {
  const loginInfo = req.body;

  UserModel.findOne({ email: loginInfo.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Use the auth method from utils to check the password
      if (utils.auth(loginInfo.password, user.password)) {
        // Generate token after successful authentication
        const token = utils.signToken(user._id); // Use user ID or any unique identifier

        res.json({ token: token }); // Return only the token
      } else {
        res.status(401).json({ error: "Login failed" }); // Use "error" for consistency
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // Return error message on catch
    });
};

// Get user by ID
exports.getUserbyID = function (req, res, next) {
  const userId = req.params.id;
  
  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ status: "User not found" });
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
};

// Get all users
exports.getAllUsers = function (req, res, next) {
  if (req.user && !req.error) {
    UserModel.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  } else {
    res.status(401).json({ status: "Unauthorized" });
  }
};

// Verify token middleware
exports.verifyToken = function (req, res, next) {
  let token = req.headers.authorization || '';

  if (token) {
    const decodedToken = utils.decodeToken(token);
    
    if (decodedToken) {
      let userId = decodedToken.id;
      
      UserModel.findById(userId)
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((err) => {
          req.error = "User not found";
          next();
        });
    } else {
      req.error = "Invalid token";
      next();
    }
  } else {
    req.error = "No token provided";
    next();
  }
};

exports.isAdmin = function (req, res, next) {
  if (req.user && req.user.permissions === 'admin') {
    next();
  } else {
    res.status(403).json({ error: "Access denied" });
  }
};
