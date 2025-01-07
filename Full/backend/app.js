require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connect } = require('./config/db');

// Importă rutele definite
const userRoutes = require('./routes/userRoutes');
const flatRoutes = require('./routes/flatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const replyRoutes = require('./routes/replyRoutes'); // Fișier separat pentru replies

// Creează aplicația Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware-uri
app.use(bodyParser.json());

// Configurare CORS
app.use(
  cors({
    origin: "http://localhost:5173", // URL-ul frontend-ului tău
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Permite preflight pentru toate rutele
app.options("*", cors());

// Conectare la baza de date
connect();

// Montează rutele
console.log("Înregistrare rute principale");
app.use('/api/users', userRoutes); // Rutele pentru utilizatori
app.use('/api/flats', flatRoutes); // Rutele pentru flats
app.use('/api/flats', messageRoutes); // Rutele pentru mesaje
app.use('/api/replies', replyRoutes); // Rutele pentru replies

// Middleware pentru logarea cererilor
app.use((req, res, next) => {
  console.log(`Request Received: ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

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
