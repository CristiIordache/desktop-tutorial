// server.js
let express = require("express");
let app = express();
app.use(express.json());
const bcrypt = require('bcrypt');


let mongoose = require("mongoose");
const connectionString = "mongodb+srv://iordachecrysty5:1qaz2wsx@cluster0.bsivr.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0";

let userRouter = require("./Routers/UserRouter");
app.use(userRouter);

mongoose.connect(connectionString)
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log("Database connection error:", err));

let port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
