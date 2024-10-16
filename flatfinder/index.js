const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const flatRoutes = require('./routes/flatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const db = require('./db'); // Importă conexiunea la MongoDB

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
db.connect();

// Define routes
app.use('/users', userRoutes);
app.use('/flats', flatRoutes);
app.use('/flats', messageRoutes); // Notice how messageRoutes is mounted under '/flats'

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle server shutdown gracefully
process.on('SIGINT', async () => {
    console.log('Closing MongoDB connection...');
    await db.close();
    process.exit(0);
});
