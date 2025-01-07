const express = require("express");
const { replyMessage } = require("../controllers/messageController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Răspunde la un mesaj specific
router.post("/:messageId", authMiddleware, (req, res, next) => {
    console.log("Received request for replying to a message");
    console.log("Params:", req.params);
    console.log("Body:", req.body);
    next();
  }, replyMessage);
  

module.exports = router;
