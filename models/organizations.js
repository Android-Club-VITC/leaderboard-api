const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Organization = new Schema({
  name: {
    type: String,
    required: true,
  },

  imageLink: {
      type: String,
      required: false         
  }
});

const Organizations = mongoose.model("organizations", Organization);
module.exports = Organizations;
