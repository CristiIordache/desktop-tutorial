let express = require("express");

let app = express();
let port = 3000;
let fs = require("fs");

app.get("/", function (req, res) {
  res.status(200).send("espress");
});

app.post("/", function (req, res) {
  // res.status(200).send("post");
  res.status(200).json({ firstName: "cris", lastName: "cris" });
});

app.get("/name", function (req, res) {
  res.status(200).json({ firstName: "cris22", lastName: "cri22s" });
});
app.get("/numar", function (req, res) {
  let randomNumber = Math.floor(Math.random() * 10);
  res.status(200).json({ randomNumber: randomNumber });
});

app.get("/job/", function (req, res) {
  res.status(400).send("missing p");
});
app.get("/job/:jobName", function (req, res) {
  if (req.params.jobName == "programer") {
    res.status(200).send(req.params.jobName);
  } else {
    res.status(200).send("nu sa gasit");
  }
});

app.get("/cars", function (req, res) {
  let cars = fs.readFileSync("./test.json", "utf-8");

  cars = JSON.parse(cars);
  res.status(200).json({
    status: "success",
    data: cars,
  });
});

app.post("/cars/:id/:name/:year", function (req, res) {
  const id = req.params.id;
  const id = req.params.name;
  const id = req.params.year;
    const newCar = { is: is, name: name, year: year };
    let cars = JSON.parse(fs.readFileSync("./test.json", "utf-8"));
    fs.writeFile("./test.json", JSON.stringify(cars), function (err, data) {
        if (err) {
            res.status(400).send("data not saved")
        }
        else {
            res.status(200).json({ status:"success",data:cars})
        }
    })



});

app.listen(port);
