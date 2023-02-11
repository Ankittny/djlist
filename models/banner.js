const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
 
  date: {
    type: Date,
    default: Date.now,
  },
});

const Banner = mongoose.model("banner", BannerSchema);
module.exports = Banner;
