const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://iordachecrysty5:1qaz2wsx@cluster0.bsivr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  
async function connect() {
    await client.connect()
    // await client.db("admin").command({pagi:1})
    const collection = client.db("test").collection("mybok")
    // const doc = await collection.findOne()
    // console.log(doc)

    let bookDoc = { "name": "ceriasian 2", nrOfPages: 99 }
    const result = await collection.insertOne(bookDoc)
    console.log (result)





}
connect()