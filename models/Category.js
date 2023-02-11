const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  parent_id: {
    type: String,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("category", CatSchema);
module.exports = Category;
