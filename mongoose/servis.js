let express = require("express");
let mongoose = require("mongoose");
let CarsModel = require("./CarsModel");

let app = express();
app.use(express.json());
let port = 3000;

const connectionString =
  "mongodb+srv://iordachecrysty5:1qaz2wsx@cluster0.bsivr.mongodb.net/CarsdB?retryWrites=true&w=majority&appName=Cluster0";
const option = { useNewUrlParser: true, useUnifiedTopology: true };

app.post("/newcar", InsertNewCar);
app.get("/cars", GetAllCars);
app.get("/filter", filter);
app.get("/stats", getstats);
function InsertNewCar(req, res, next) {
  let body = req.body;
  let newItem = new CarsModel(body);
  newItem
    .save()
    .then((car) => {
      res.json({ data: car });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
      console.log(error);
    });
}

function GetAllCars(req, res, next) {
  CarsModel.find({})
    .then((data) => {
      res.json({ data: data });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
}

async function filter(req, res, next) {
  let queryParam = { ...req.query };
  let fields = ["page", "sort", "limit", "fields"];
  fields.forEach((el) => {
    delete queryParam[el];
  });

  let string = JSON.stringify(queryParam);

  string = string.replace(/\b(get|gt|lte|lt)\b/g, (match) => `$${match}`);
  queryParam = JSON.parse(string);
  let sort = "";
  let selected = "";
  if (req.query.sort) {
    sort = req.query.sort.split(",").join("");
  }
  if (req.query.fields) {
    selected + req.query.fields.split(",").join("");
  }

  let limit = req.query.limit || 100;
  let page = req.query.page || 1;
  let skip = (page - 1) * limit;

  let nrofDocuments = await CarsModel.countDocuments();

  if (skip >= nrofDocuments) {
    res.status(404).json({ data: "no documents" });
    return;
  }

  CarsModel.find(queryParam)
    .sort(sort)
    .select(selected)
    .limit(limit)
    .skip(skip)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
}

function getstats(req, res, next) {
  CarsModel.aggregate([
    {
      $match: { yearMade: 1900 },
    },
    {
      $group: {
        _id: null,
        count: { $avg: "$yearMade" },
        minYear: { $min: "$yearMade" },
      },
    },
  ]
  ).then(data => {
      res.json(data);

  }).catch(err=>{res.json({err:err })})
      
}

mongoose.connect(connectionString, option);
app.listen(port, function () {
  console.log("Express started on port " + port);
});
