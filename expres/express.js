let express = require("express");
let myLib = require("./processLib");
let fs = require("fs")

let app = express();
app.use(express.json());
let port = 3000;

//API work

app.patch("/cars/:id", UpdateCars)



// worker functions

app.get('/',function(req,res){
  res.status(200).send("Express");
})
app.post('/',function(req,res){
  // res.status(200).send("Post");
  res.status(200).json({firstName: "Marina", lastName: "Simion"});
})
app.get("/name", function(req,res){
  res.status(200).json({firstName: "Ioana", lastName: "Simion"});
})
app.get("/number", function(req,res){
  res.status(200).json({randomNumber: myLib.RandomNumber()});
})
app.get("/job", function(req,res){
  res.status(400).send("Missing parameters!");
})
app.get("/job/:jobName", function(req,res){
  if(req.params.jobName=="Programmer"){
  res.status(200).send(req.params.jobName);
  }
  res.status(200).send("Data not Found");
})
app.get("/cars", function(req,res){
  let cars = fs.readFileSync("./test.json", 'utf-8');
  cars=JSON.parse(cars)
  res.status(200).json({status:"succes",data:cars});
})
app.post("/cars/:id/:name/:year", function(req,res){
  const id = req.params.id;
  const name = req.params.name;
  const year = req.params.year;
  const newCar={id: id, name: name, year: year}

  let cars = JSON.parse(fs.readFileSync("./test.json", 'utf-8'));
  cars.push(newCar);
  fs.writeFile("./test.json", JSON.stringify(cars), function(err,data){
    if(err){
    res.status(400).send("Data not saved");
    }
    res.status(200).json({status:"succes", data: cars});
  })
})

app.post("/cars", function(req,res){
  let cars = JSON.parse(fs.readFile("./test.json", 'utf-8'));
  const id = cars[cars.length-1].id + 1;
  const newCar = Object.assign({id: id}, req.body[0]);
  cars.push(newCar);
  fs.writeFile("./test.json", JSON.stringify(cars), function(err,data){
    if(err){
    res.status(400).send("Data not saved");
    }
    res.status(200).json({status:"succes", data: cars});
  })
})

app.get("/cars/:id", function(req,res){
  const id = Number(req.params.id);
  let cars = JSON.parse(fs.readFileSync("./test.json", 'utf-8'));
  let car = cars.find(el => el.id===id);
  if(car===undefined){
    return res.status(404).json({status:"fail",message:`No car found with id: ${id}`})
  } 
  res.status(200).json(car); 
  
})
function writeFile(fileName,fileContent,res){
  fs.writeFile(fileName, fileContent, function(err,data){
    if(err){
    res.status(400).send("Data not saved");
    }
    res.status(200).json({status:"succes", data: JSON.parse(fileContent)});
  })
}
function UpdateCars(req,res){
  const id = Number(req.params.id);
  let cars = JSON.parse(fs.readFileSync("./test.json", 'utf-8'));
  let car = cars.find(el => el.id===id);
  if(car===undefined){
    return res.status(404).json({status:"fail",message:`No car found with id: ${id}`})
  } 
  //console.log(req.body[0].name)
  
  car.name = req.body[0].name;
  car.year = Number(req.body[0].year);
  cars[id-1] = car;

  writeFile("./test.json", JSON.stringify(cars), res);
  

}
app.listen(port);