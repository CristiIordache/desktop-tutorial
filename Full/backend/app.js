require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connect } = require('./config/db');

// Importă rutele definite
const userRoutes = require('./routes/userRoutes');
const flatRoutes = require('./routes/flatRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Creează aplicația Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware-uri
app.use(bodyParser.json());
app.use(cors());

// Conectare la baza de date
connect();

// Montează rutele
console.log("Înregistrare rute principale");
app.use('/api/users', userRoutes); // Rutele pentru utilizatori
app.use('/api/flats', flatRoutes); // Rutele pentru flats
app.use('/api/messages', messageRoutes); // Rutele pentru mesaje


// Debugging Middleware
app.use((req, res, next) => {
  console.log(`Request Received: ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});




// Pornește serverul
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
