const crypto = require("crypto");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  nick: String,
  name: String,
  age: Number,
  rank: Number,
  email: String,
  hash: String,
  salt: String,
  level: String,
});

StudentSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hashing user's salt and password with 1000 iterations,

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

StudentSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

const Student = (module.exports = mongoose.model("Student", StudentSchema));
