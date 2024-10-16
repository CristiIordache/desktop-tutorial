const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI || "mongodb+srv://iordachecrysty5:1qaz2wsx@cluster0.bsivr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

exports.connect = async function () {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Stop the application if we can't connect to the DB
  }
};

exports.close = async function () {
  try {
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

exports.client = function () {
  return client;
};
