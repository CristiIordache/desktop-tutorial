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
    const { content } = req.body; // Conținutul răspunsului

    console.log("Mesaj original ID:", id);
    console.log("Conținut răspuns:", content);

    // Verifică dacă mesajul original există
    const originalMessage = await Message.findById(id);
    if (!originalMessage) {
      return res.status(404).json({ message: "Original message not found" });
    }

    // Creează un nou mesaj ca răspuns
    const reply = new Message({
      content,
      flatId: originalMessage.flatId, // Același flatId ca și mesajul original
      senderId: req.user.id, // ID-ul utilizatorului care răspunde
    });

    await reply.save();

    console.log("Răspuns creat:", reply);
    res.status(201).json(reply);
  } catch (error) {
    console.error("Eroare la crearea răspunsului:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Flat ID primit pentru mesaje:", id);

    // Obține toate mesajele pentru apartamentul specificat
    const messages = await Message.find({ flatId: id }).populate("senderId", "firstName lastName");
    res.status(200).json(messages);
  } catch (error) {
    console.error("Eroare la obținerea mesajelor:", error.message);
    res.status(500).json({ error: error.message });
  }
};