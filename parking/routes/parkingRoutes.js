const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Ticket = require('../models/TicketModel');
const paymentUtils = require('../utils/paymentUtils');

// Endpoint pentru intrare
router.post('/entry', async (req, res) => {
  const ticketId = uuidv4();
  const entryTime = new Date();

  const newTicket = new Ticket({
    ticketId,
    entryTime,
    paid: false,
  });

  try {
    await newTicket.save();
    res.json({ ticketId, entryTime });
  } catch (err) {
    res.status(500).json({ error: 'Eroare la salvarea tichetului' });
  }
});

// Endpoint pentru plată
router.post('/pay', async (req, res) => {
  const { ticketId } = req.body;

  try {
    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket) {
      return res.status(404).json({ error: 'Tichetul nu a fost găsit' });
    }

    const fee = paymentUtils.calculateFee(ticket.entryTime, new Date());
    if (fee > 0) {
      ticket.paid = true;
      await ticket.save();
      res.json({ message: `Plată realizată cu succes. Taxă achitată: ${fee}` });
    } else {
      res.json({ message: 'Interval gratuit. Nu este nevoie de plată.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Eroare la procesarea plății' });
  }
});

// Endpoint pentru ieșire
router.post('/exit', async (req, res) => {
  const { ticketId } = req.body;

  try {
    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket) {
      return res.status(404).json({ error: 'Tichetul nu a fost găsit' });
    }

    const fee = paymentUtils.calculateFee(ticket.entryTime, new Date());
    if (fee === 0 || ticket.paid) {
      res.json({ message: 'OK. Bariera deschisă.' });
    } else {
      res.status(403).json({ message: 'NO. Plata nu a fost efectuată.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Eroare la verificarea ieșirii' });
  }
});

module.exports = router;
