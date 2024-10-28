//UserController.js

const UserModel = require("../Models/UserModel");
const bcrypt = require('bcrypt');
const utils = require('../utils'); // Assuming a utility file for token handling

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
        return res.status(404).json({ status: "User not found" });
      }

      if (auth(loginInfo.password, user.password)) {
        res.json({ status: "Login successful" });
      } else {
        res.status(401).json({ status: "Login failed" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
};

// Password authentication function
function auth(plainPassword, encryptedPassword) {
  return bcrypt.compareSync(plainPassword, encryptedPassword);
}

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
    const decodedToken = utils.decodeToken(token); // Assuming a function that decodes the token
    
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
  if (res.user.permission == 'admin') {
    next()
  }
  else {
    res.status(400).json({ error: "nu ai aces"})
  }
}