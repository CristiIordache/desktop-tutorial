//server.js

let express = require("express");
let app = express();
app.use(express.json());
let mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://iordachecrysty5:1qaz2wsx@cluster0.bsivr.mongodb.net/user1?retryWrites=true&w=majority&appName=Cluster0";

let userRouter = require("./Routers/UserRouter");
app.use(userRouter);
mongoose.connect(connectionString);
let port = 3000;
app.listen(port);
