let express = require("express");
let mongoose =require("mongoose");
let CarsModel =require("./CarsModel");


let app = express();
app.use(express.json());
let port=3000;

const connectionString="mongodb+srv://iordachecrysty5:1qaz2wsx@cluster0.bsivr.mongodb.net/CarsdB?retryWrites=true&w=majority&appName=Cluster0";
const option={useNewUrlParser:true};

app.post("/newcar",InsertNewCar);
app.get("/cars",GetAllCars);



function InsertNewCar(req,res,next)
{
    let body = req.body;
    let newItem = new CarsModel(body);
    newItem.save().then(car=>{
    res.json({data:car});
}).catch(error=>{
    res.json({error:error});
    console.log(error);
})}

function GetAllCars(req,res,next)
{
    CarsModel.find({}).then(data=>{
        res.json({data:data});
    }).catch(err=>{
        res.status(400).json({error:err});
    })
}






mongoose.connect(connectionString,option);
app.listen(port,function(){
    console.log("Express started!");
})