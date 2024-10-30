//UserRouter.js

const express = require("express");
let userRouter = express.Router();
let UserController = require("../Controllers/UserController");

userRouter.post("/register", UserController.createUser);
userRouter.post("/login", UserController.loginUser);
userRouter.get("/getUserbyID", UserController.verifyToken, UserController.getUserbyID);
userRouter.get("/getAllUsers", UserController.verifyToken, UserController.getAllUsers); // Updated this line
userRouter.post("/forgotPassword", UserController.forgotPassword)
userRouter.post("/resetPassword/:token", UserController.forgotPassword)
module.exports = userRouter;
 
