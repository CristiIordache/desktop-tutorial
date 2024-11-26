//Full\flatNode\db.js

const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI || "mongodb+srv://iordachecrysty5:1qaz2wsx@cluster0.bsivr.mongodb.net/Project?retryWrites=true&w=majority&appName=Cluster0";

exports.connect = async function () {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Stop the application if we can't connect to the DB
  }
};

exports.close = async function () {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};
