// index.js
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const flatRoutes = require('./routes/flatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const db = require('./db');

dotenv.config();

const app = express();
app.use(express.json());

db.connect();

app.use('/users', userRoutes);
app.use('/flats', flatRoutes);
app.use('/flats', messageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
    console.log('Closing MongoDB connection...');
    await db.close();
    process.exit(0);
});
