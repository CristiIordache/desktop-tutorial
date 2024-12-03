//\Full\backend\config\db.js

const mongoose = require('mongoose');
const connectionString = process.env.MONGO_URI || 'mongodb+srv://iordachecrysty5:1qaz2wsx@cluster0.bsivr.mongodb.net/Project?retryWrites=true&w=majority&appName=Cluster0';

exports.connect = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
