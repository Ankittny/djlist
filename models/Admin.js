const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const admin = mongoose.model("admin",AdminSchema);
module.exports = admin;
