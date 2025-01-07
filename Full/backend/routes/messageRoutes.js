
//Full\backend\routes\messageRoutes.js

const express = require("express");
const { getAllMessages, getUserMessages, addMessage  } = require("../controllers/messageController");

const authMiddleware = require("../middlewares/authMiddleware");
const { replyMessage } = require("../controllers/messageController");

const router = express.Router();




router.get("/:id/messages", authMiddleware, getAllMessages);
router.get("/:id/messages/:senderId", authMiddleware, getUserMessages);
router.post("/:id/messages", authMiddleware, addMessage);
router.post("/:id/reply", authMiddleware, replyMessage);
router.get("/:id", authMiddleware, getAllMessages);

router.get("/:id/messages", authMiddleware, getAllMessages); // Get messages for a flat
router.post("/:id/messages", authMiddleware, addMessage); // Add a new message to a flat



router.get("/:id/messages", (req, res, next) => {
    console.log("GET /:id/messages hit");
    next();
  }, authMiddleware, getAllMessages);
  


module.exports = router;
