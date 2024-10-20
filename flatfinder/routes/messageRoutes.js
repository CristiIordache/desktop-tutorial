//messageRoutes.js

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Flat = require('../models/Flat');
const authMiddleware = require('../middleware/authMiddleware');

// Get all messages for a flat (only owner can see)
router.get('/:id/messages', authMiddleware, async (req, res) => {
    try {
        const flat = await Flat.findById(req.params.id);
        if (!flat) return res.status(404).json({ message: 'Flat not found.' });

        // Check if the user is the owner of the flat
        if (flat.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to view messages for this flat.' });
        }

        const messages = await Message.find({ flatId: req.params.id });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages.' });
    }
});

// Get messages from a specific sender (the sender can view their own messages)
router.get('/:id/messages/:senderId', authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find({ flatId: req.params.id, senderId: req.params.senderId });
        if (req.user.id !== req.params.senderId) {
            return res.status(403).json({ message: 'You do not have permission to view these messages.' });
        }

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages.' });
    }
});

// Add a message to a flat
router.post('/:id/messages', authMiddleware, async (req, res) => {
    const { content } = req.body;

    try {
        const flat = await Flat.findById(req.params.id);
        if (!flat) return res.status(404).json({ message: 'Flat not found.' });

        const newMessage = new Message({
            content,
            flatId: req.params.id,
            senderId: req.user.id
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error adding message.' });
    }
});

module.exports = router;
