const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: String,
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  flatId: { type: mongoose.Schema.Types.ObjectId, ref: "Flat" },
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: null },
});

module.exports = mongoose.model("Message", messageSchema);
