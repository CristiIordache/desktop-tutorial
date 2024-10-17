// Importă modulele necesare
const express = require('express'); // Express este folosit pentru a crea serverul web.
const dotenv = require('dotenv'); // dotenv este folosit pentru a încărca variabilele de mediu dintr-un fișier .env.
const userRoutes = require('./routes/userRoutes'); // Importă rutele pentru utilizatori (autentificare, înregistrare, etc.)
const flatRoutes = require('./routes/flatRoutes'); // Importă rutele pentru apartamente (flats).
const messageRoutes = require('./routes/messageRoutes'); // Importă rutele pentru mesaje.
const db = require('./db'); // Importă conexiunea la MongoDB definită în fișierul db.js

// Încarcă variabilele de mediu din fișierul .env (de ex. JWT_SECRET, DB_URI)
dotenv.config();

const app = express(); // Creează o instanță a aplicației Express.
app.use(express.json()); // Middleware pentru parsarea cererilor de tip JSON (Body Parsing).

// Conectează-te la MongoDB folosind funcția definită în db.js
db.connect();

// Definește rutele pentru utilizatori, apartamente și mesaje.
app.use('/users', userRoutes); // Rutele definite în userRoutes sunt accesibile la endpoint-ul '/users'.
app.use('/flats', flatRoutes); // Rutele pentru apartamente sunt accesibile la endpoint-ul '/flats'.
app.use('/flats', messageRoutes); // Rutele pentru mesaje sunt accesibile tot sub '/flats' (mesajele sunt legate de apartamente).

// Specifică portul pe care va rula serverul. Utilizează variabila de mediu PORT, dacă este definită, sau 5000 în mod implicit.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Gestionarea opririi serverului în mod controlat pentru a închide conexiunea la MongoDB.
process.on('SIGINT', async () => {
    console.log('Closing MongoDB connection...');
    await db.close(); // Închide conexiunea la baza de date pentru a evita pierderi de date.
    process.exit(0); // Oprește procesul serverului cu codul de ieșire 0 (fără erori).
});
