const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://iordachecrysty5:1qaz2wsx@cluster0.bsivr.mongodb.net/parking?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

module.exports = mongoose;
