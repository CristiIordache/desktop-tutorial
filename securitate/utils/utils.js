let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let nodemailer=require("nodemailer")

const email_username = "ebb9fd6f976e07"
const email_password = "39d34440e36d81"
const email_host = "sandbox.smtp.mailtrap.io"
const email_port="2525"

exports.auth = function (plainPassword, encryptedPassword) {
    let result = bcrypt.compareSync(plainPassword, encryptedPassword);
    console.log(result);
    return result;
};

exports.signToken = function (userID) { // Fixed typo from 'singToken' to 'signToken'
    let token = jwt.sign(
        { id: userID },
        "cris",
        { expiresIn: 3600 }
    );
    return token;
};

exports.decodeToken = function (token) { // Fixed typo from 'decodeTaken' to 'decodeToken'
    let decodedToken = jwt.verify(token, "cris"); // Using verify instead of decode to get the payload
    return decodedToken;
};
exports.sendEmail=async function (options) {
    let transport = nodemailer.createTransport({
        host: email_host,
        port: email_port,
        auth:{
            user: email_username,
            pass:email_password
        }
    })

    const mail = {
        from: options.from,
        to: options.email,
        subject: options.subject,
        text:options.text
}
await transport.sendMail(mail)
    
    
}



exports.verifyToken = function (token) {
    try {
        let reslut = jwt.verify(token,"cris");
        return true;
    }
    catch {
        return false;
    }
}



