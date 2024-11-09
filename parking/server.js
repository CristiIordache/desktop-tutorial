const express = require('express');
const mongoose = require('mongoose');
const parkingRoutes = require('./routes/parkingRoutes');
require('./config/db');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/parking', parkingRoutes);

mongoose.connect('mongodb://localhost:27017/parkingDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectat la baza de date MongoDB');
}).catch((err) => {
  console.error('Eroare la conectarea la MongoDB:', err);
});

app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
