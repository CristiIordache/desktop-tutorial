let mongoose = require("mongoose");

let Schema = mongoose.Schema;
let utils=require("../utils/utils")
// let bcrypt=require('bcrypt')


let UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, , "email in use"],
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
      required: [true, , "email in use"],
    minlenght:6

  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  create: Date,
    modified: Date,
  permissions:{}
});


UserSchema.pre('save', function (next) {
    if (!this.isModified('password'))
    {
        return next()
    }
    let salt = bcrypt.genSaltSync(12)

    this.password = bcrypt.hashSync(this.password, salt)
    next()
})



module.exports = mongoose.model("user", UserSchema);
