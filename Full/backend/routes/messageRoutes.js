const express = require("express");
const {
  getAllMessages,
  addMessage,
  replyMessage,
} = require("../controllers/messageController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Obține toate mesajele pentru un flat
router.get("/:id/messages", authMiddleware, getAllMessages);

// Adaugă un mesaj pentru un flat
router.post("/:id/messages", authMiddleware, addMessage);



module.exports = router;
