//\Full\backend\models\Flat.js

const mongoose = require('mongoose');

const FlatSchema = new mongoose.Schema({
  flatName: { type: String, required: true },
  city: { type: String, required: true },
  streetName: { type: String, required: true },
  streetNumber: { type: String, required: true },
  yearBuilt: { type: Number, required: true },
  rentPrice: { type: Number, required: true },
  dateAvailable: { type: Date, required: true },
  hasAC: { type: Boolean, default: false },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Flat', FlatSchema);
