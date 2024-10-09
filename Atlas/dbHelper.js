const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://iordachecrysty5:1qaz2wsx@cluster0.bsivr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  exports.connect=async function(){
    await client.connect();
  };
  exports.close=async function()
  {
    await client.close();
  };
  exports.client=function()
  {
    return client;
  }