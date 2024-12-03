require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connect } = require('./config/db');

const userRoutes = require('./routes/userRoutes'); // Importă rutele definite în `userRoutes.js`

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware-uri
app.use(bodyParser.json());
app.use(cors());

// Montează rutele
app.use('/api/users', userRoutes); // Toate rutele din `userRoutes.js` vor avea prefixul `/api/users`

// Conectare la baza de date
connect();

// Pornește serverul
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
