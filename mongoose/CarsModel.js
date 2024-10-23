let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CarsSchema= new Schema({
    carBrand:{
        type:String,
        required:[true,"Must provide a car brand"],
        trim:true,
        minlength:[2,"Brand must have more than 2 chars"],
        maxlength:[50,"Too long"]
    },
    color:String,
    yearMade:{
        type:Number,
        required:true,
        min:[1200,"Min value"],
        max:[2500,"The future!"]
    },
    created:Date
});


CarsSchema.post("save", function (data, next) {
data._id=null

    next()
})
CarsSchema.pre(/^find/, function (data, next) {
   
    
        next()
    })
module.exports = mongoose.model('cars',CarsSchema);