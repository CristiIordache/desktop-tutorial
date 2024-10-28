//utils.js

let bcrypt = require("bcrypt");
let  jwt=require("jsonwebtoken");

exports.auth=function(plainPassword,encrypterPassword){
    let result= bcrypt.compareSync(plainPassword,encrypterPassword);
    console.log(result);
    return result;
}


exports.singToken = function (userID)
{
    let token = jwt.sign({
        id: userID
    }, "cris", { expiresIn: 3600 })
    return token


}

exports.decodeTaken = function (token) {
    let decodeTaken = jwt.decode(token, "cris")
    utils.decodeTaken(token)
    return decodeTaken;
}