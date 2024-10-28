//UserRouter.js

const express = require("express");
let userRouter = express.Router();
let UserConstroller = require("../Controllers/UserController");

userRouter.post("/register", UserConstroller.createUser);
userRouter.post("/login", UserConstroller.loginUser);
userRouter.get("/getUserbyID",UserConstroller.verifyToken, UserConstroller.getUserbyID);
userRouter.get("/getAllUsers", UserConstroller.verifyToken,getAllUsers);

module.exports = userRouter;
