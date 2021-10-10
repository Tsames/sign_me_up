/********************************
Dependencies
********************************/

const mongoose = require("./connection")

/********************************
Define User Model
********************************/

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema ({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  friends: Array
})

const User = model("User", userSchema);

/********************************
Export User Model
********************************/

module.exports = User;

/////////////////////////////////