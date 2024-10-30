let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

exports.auth = function(plainPassword, encryptedPassword) {
    let result = bcrypt.compareSync(plainPassword, encryptedPassword);
    console.log(result);
    return result;
}

exports.signToken = function(userID) { // Fixed typo from 'singToken' to 'signToken'
    let token = jwt.sign(
        { id: userID },
        "cris",
        { expiresIn: 3600 }
    );
    return token;
}

exports.decodeToken = function(token) { // Fixed typo from 'decodeTaken' to 'decodeToken'
    let decodedToken = jwt.verify(token, "cris"); // Using verify instead of decode to get the payload
    return decodedToken;
}
