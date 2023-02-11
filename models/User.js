const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  djname: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "India",
  },
  city_id:{
    type:String,
    required:true,
  },
  image: {
    type: String,
    required:true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
