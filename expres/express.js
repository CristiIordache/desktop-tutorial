let express = require("express");
let fs = require("fs");

let app = express();
app.use(express.json()); // Middleware pentru a parsa cererile cu JSON
let port = 3000;

app.use(function (req, res, next) {
  console.log("request", Data.new());
  next();
});

app.use("/name", function (req, res, next) {
  console.log("Middleware od /name");
  let body = req.body;
  req.body[0].name="cris"
  next();
});


function ModifyBody(req)



// Definirea rutelor (endpoints) pentru API
app.patch("/cars/:id", UpdateCars); // Ruta PATCH pentru actualizarea unei mașini după ID

app.get("/", handleRoot); // Ruta GET pentru rădăcină (home)
app.post("/", handlePostRoot); // Ruta POST pentru rădăcină
app.get("/name", handleName); // Ruta GET care returnează numele
app.get("/number", handleNumber); // Ruta GET care returnează un număr aleator
app.get("/job", handleJobMissingParams); // Ruta GET pentru job fără parametri (eroare)
app.get("/job/:jobName", handleJob); // Ruta GET pentru job cu un parametru de jobName

app.get("/cars", handleGetCars); // Ruta GET pentru returnarea tuturor mașinilor
app.post("/cars/:id/:name/:year", handleAddCarParams); // Ruta POST pentru adăugarea unei mașini cu parametrii direct în URL
app.post("/cars", handleAddCarBody); // Ruta POST pentru adăugarea unei mașini din corpul cererii
app.get("/cars/:id", handleGetCarById); // Ruta GET pentru returnarea unei mașini după ID

app.listen(port); // Ascultă pe portul 3000 și pornește serverul

// Funcțiile lucrătoare (worker functions) care gestionează logica fiecărei rute

// Ruta GET pentru rădăcină (root)
function handleRoot(req, res) {
  res.status(200).send("Express"); // Trimite răspunsul "Express" cu status 200 (OK)
}

// Ruta POST pentru rădăcină, returnează un obiect JSON cu nume și prenume
function handlePostRoot(req, res) {
  res.status(200).json({ firstName: "cristian", lastName: "Iordache" });
}

// Ruta GET pentru returnarea numelui sub formă de JSON
function handleName(req, res) {
  res.status(200).json({ firstName: "cristian", lastName: "Iordache" });
}

// Ruta GET pentru returnarea unui număr aleator (necesită funcția RandomNumber din myLib)
function handleNumber(req, res) {
  res.status(200).json({ randomNumber: myLib.RandomNumber() });
}

// Ruta GET care returnează o eroare dacă parametrii lipsesc
function handleJobMissingParams(req, res) {
  res.status(400).send("Missing parameters!"); // Răspunde cu eroare 400 și mesaj de parametrii lipsă
}

// Ruta GET care returnează un job specificat prin parametrii URL
function handleJob(req, res) {
  const jobName = req.params.jobName; // Extrage parametru jobName din URL
  if (jobName === "Programmer") {
    res.status(200).send(jobName); // Trimite răspunsul dacă job-ul este "Programmer"
  } else {
    res.status(200).send("Data not Found"); // Trimite mesaj dacă job-ul nu este găsit
  }
}

// Ruta GET pentru returnarea tuturor mașinilor din fișierul test.json
function handleGetCars(req, res) {
  let cars = fs.readFileSync("./test.json", "utf-8"); // Citește conținutul fișierului test.json
  cars = JSON.parse(cars); // Parsează conținutul fișierului JSON
  res.status(200).json({ status: "success", data: cars }); // Trimite răspunsul cu datele mașinilor
}

// Ruta POST pentru adăugarea unei mașini cu parametrii extrași din URL
function handleAddCarParams(req, res) {
  const id = req.params.id; // Extrage id-ul din URL
  const name = req.params.name; // Extrage numele mașinii din URL
  const year = req.params.year; // Extrage anul mașinii din URL
  const newCar = { id: id, name: name, year: year }; // Creează un obiect pentru noua mașină

  let cars = JSON.parse(fs.readFileSync("./test.json", "utf-8")); // Citește și parsează fișierul JSON
  cars.push(newCar); // Adaugă noua mașină în lista de mașini
  writeFile("./test.json", JSON.stringify(cars), res); // Salvează fișierul actualizat și trimite răspunsul
}

// Ruta POST pentru adăugarea unei mașini din corpul cererii
function handleAddCarBody(req, res) {
  let cars = JSON.parse(fs.readFileSync("./test.json", "utf-8")); // Citește și parsează fișierul JSON
  const id = cars[cars.length - 1].id + 1; // Generează un id nou, incrementând ultimul id
  const newCar = Object.assign({ id: id }, req.body[0]); // Combină noul id cu corpul cererii
  cars.push(newCar); // Adaugă noua mașină în lista de mașini
  writeFile("./test.json", JSON.stringify(cars), res); // Salvează fișierul actualizat și trimite răspunsul
}

// Ruta GET pentru returnarea unei mașini după ID-ul specificat în URL
function handleGetCarById(req, res) {
  const id = Number(req.params.id); // Extrage și convertește ID-ul din URL
  let cars = JSON.parse(fs.readFileSync("./test.json", "utf-8")); // Citește și parsează fișierul JSON
  let car = cars.find((el) => el.id === id); // Găsește mașina cu ID-ul specificat
  if (!car) {
    return res
      .status(404)
      .json({ status: "fail", message: `No car found with id: ${id}` }); // Trimite eroare dacă mașina nu este găsită
  }
  res.status(200).json(car); // Trimite mașina găsită ca răspuns
}

// Funcție auxiliară pentru scrierea în fișier
function writeFile(fileName, fileContent, res) {
  fs.writeFile(fileName, fileContent, function (err) {
    if (err) {
      return res.status(400).send("Data not saved"); // Trimite eroare dacă scrierea a eșuat
    }
    res.status(200).json({ status: "success", data: JSON.parse(fileContent) }); // Trimite succes și datele salvate
  });
}

// Funcția PATCH pentru actualizarea unei mașini după ID
function UpdateCars(req, res) {
  const id = Number(req.params.id); // Extrage și convertește ID-ul din URL
  let cars = JSON.parse(fs.readFileSync("./test.json", "utf-8")); // Citește și parsează fișierul JSON
  let car = cars.find((el) => el.id === id); // Găsește mașina cu ID-ul specificat
  if (!car) {
    return res
      .status(404)
      .json({ status: "fail", message: `No car found with id: ${id}` }); // Trimite eroare dacă mașina nu este găsită
  }

  car.name = req.body[0].name; // Actualizează numele mașinii din corpul cererii
  car.year = Number(req.body[0].year); // Actualizează anul mașinii din corpul cererii
  cars[id - 1] = car; // Actualizează mașina în array

  writeFile("./test.json", JSON.stringify(cars), res); // Salvează modificările în fișier
}
