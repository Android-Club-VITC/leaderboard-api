const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Socials = new Schema({
  linkedin: String,
  discord: String,
  github: String,
});

// const Otp = new Schema(
//   {
//     opt: Number,
//   },
//   {
//     timestamp: true,
//   }
// );

const Member = new Schema({
  email: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
    enum: ["TECH","CONTENT","CREATIVE","OPERATIONS"],
  },

  role: {
    type: Number,
    default: 2,
    enum: [1, 2],
    required: true,
  },

  socials: Socials,

  opt: {
    type: Number,
    required: false,
  },

  member_type: {
    type: String,
    enum: ["FFCS", "NON-FFCS"],
    required: true,
  },

  reg_no: {
    type: String,
    required: true,
  },
});

const Members = mongoose.model("members", Member);
module.exports = Members;
