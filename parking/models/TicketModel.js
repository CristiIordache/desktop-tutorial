const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: String,
  entryTime: Date,
  paid: Boolean,
});

module.exports = mongoose.model('Ticket', ticketSchema);
