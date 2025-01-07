const Message = require("../models/Message");
const Flat = require("../models/Flat");

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
    const { content } = req.body;
    const flatId = req.params.id;

    const flat = await Flat.findById(flatId); // Verifică dacă apartamentul există
    if (!flat) {
      return res.status(404).json({ error: "Apartamentul nu a fost găsit." });
    }

    if (!content) {
      return res.status(400).json({ error: "Conținutul mesajului este necesar." });
    }

    const senderId = req.user.id; // ID-ul utilizatorului conectat
    const newMessage = new Message({ content, flatId, senderId });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Eroare pe server." });
  }
};

exports.replyMessage = async (req, res) => {
  try {
    console.log("ReplyMessage Controller Triggered.");
    console.log("Params:", req.params);
    console.log("Request Body:", req.body);

    const { messageId } = req.params;
    const { content } = req.body;

    if (!content) {
      console.log("Reply content is missing.");
      return res.status(400).json({ error: "Conținutul răspunsului este necesar." });
    }

    const originalMessage = await Message.findById(messageId);
    if (!originalMessage) {
      console.log(`Original message not found for messageId: ${messageId}`);
      return res.status(404).json({ error: "Mesajul original nu a fost găsit." });
    }

    const reply = new Message({
      content,
      senderId: req.user.id,
      flatId: originalMessage.flatId,
      replyTo: messageId,
    });

    await reply.save();
    console.log("Reply saved successfully:", reply);
    res.status(201).json(reply);
  } catch (error) {
    console.error("Error replying to message:", error);
    res.status(500).json({ error: "Failed to reply to message." });
  }
};







exports.getAllMessages = async (req, res) => {
  try {
    const flatId = req.params.id;
    const flat = await Flat.findById(flatId);

    if (!flat) {
      return res.status(404).json({ error: "Apartamentul nu a fost găsit." });
    }

    const messages = await Message.find({ flatId }).populate("senderId", "firstName lastName");

    if (!messages.length) {
      return res.status(200).json([]); // Returnează un array gol dacă nu sunt mesaje
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error("Eroare la obținerea mesajelor:", error);
    res.status(500).json({ error: "Eroare pe server." });
  }
};
