const UserModel = require("../Models/UserModel");
const bcrypt = require('bcrypt');

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
        res.json({ status:  });
      } else {
        res.status(401).json({ status: "Login failed" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
};

// Password authentication function
// function auth(plainPassword, encryptedPassword) {
//   return bcrypt.compareSync(plainPassword, encryptedPassword);
// }

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
  UserModel.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
};
 