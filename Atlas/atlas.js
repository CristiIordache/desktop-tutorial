const express = require("express");
let dbHelper = require("./dbHelper");

dbHelper.connect(); // Conectare la baza de date
let client = dbHelper.client();
let db = client.db("Test");
let app = express();
app.use(express.json());
let port = 3000;

app.get("/", GetOneRecord);
app.post("/OneRecord", InsertOneRecord);
app.post("/maimulte", InsertManyRecords);
app.get("/allrecord", GetAllDoc);
app.get("/specific", GetFilter);
app.get("/Fill/:filter/:value/:operator", Filter); // am redenumit parametrii pentru claritate

// Selectează un document
async function GetOneRecord(req, res) {
  try {
    const col = db.collection("mybok");
    const data = await col.findOne();
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ status: "Error fetching record", error: e });
  }
}

// Inserare un document
async function InsertOneRecord(req, res) {
  try {
    const coll = db.collection("mybok");
    let dataToInsert = req.body;
    const data = await coll.insertOne(dataToInsert);
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ status: "Error inserting record", error: e });
  }
}

// Inserare mai multe documente
async function InsertManyRecords(req, res) {
  try {
    const coll = db.collection("mybok");
    let dataToInsert = req.body;

    if (!Array.isArray(dataToInsert)) {
      return res
        .status(400)
        .json({ status: "Input should be an array of documents" });
    }

    const data = await coll.insertMany(dataToInsert);
    res.status(200).json(data);
  } catch (e) {
    res
      .status(400)
      .json({ status: "Error inserting multiple records", error: e });
  }
}

// Selectează toate documentele
async function GetAllDoc(req, res) {
  try {
    const coll = db.collection("mybok");
    const data = await coll.find().toArray();
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ status: "Error fetching all records", error: e });
  }
}

// Găsește documente după un criteriu specific (filtrare după corpul cererii)
async function GetFilter(req, res) {
  try {
    const coll = db.collection("mybok");
    const data = await coll.find(req.body).toArray();
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ status: "Error filtering records", error: e });
  }
}

// Filtrare avansată cu parametrii
async function Filter(req, res) {
  try {
    const coll = db.collection("mybok");
    let params = req.params;

    // Construiește dinamica filtrului pe baza parametrilor
    let query = {};
    query[params.filter] = { [`$${params.operator}`]: params.value };

    const data = await coll.find(query).toArray();
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ status: "Error with advanced filter", error: e });
  }
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
