//\Full\backend\controllers\messageController.js

const Message = require("../models/Message");

exports.getAllMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await Message.find({ flatId: id }).populate("senderId", "firstName lastName");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserMessages = async (req, res) => {
  try {
    const { id, senderId } = req.params;
    const messages = await Message.find({ flatId: id, senderId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const newMessage = new Message({ content, flatId: id, senderId: req.user.id });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.replyMessage = async (req, res) => {
  try {
    const { id } = req.params; // ID-ul mesajului original
    const { content } = req.body;

    // Verifică dacă utilizatorul are acces la mesaj
    const originalMessage = await Message.findById(id);
    if (!originalMessage) return res.status(404).json({ message: "Original message not found" });

    const newMessage = new Message({
      content,
      flatId: originalMessage.flatId,
      senderId: req.user.id,
      created: new Date(),
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
