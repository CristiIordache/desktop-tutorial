
//\Full\backend\models\Message.js

const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  flatId: { type: mongoose.Schema.Types.ObjectId, ref: "Flat", required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
