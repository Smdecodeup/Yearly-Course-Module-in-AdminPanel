const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({
  Firstname: String,
  Lastname: String,
  Email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: Number,
});
const USER = mongoose.model("user", userschema);

module.exports = USER;
