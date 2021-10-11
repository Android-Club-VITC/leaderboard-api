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
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
    enum: ["TECHNICAL","CONTENT","CREATIVE","OPERATIONS","PRESIDENT"],
  },

  role: {
    type: Number,
    default: 2,
    enum: [1, 2],
    required: true,
  },

  socials: Socials,

  otp: {
    type: Number,
    required: false,
  },

  member_type: {
    type: String,
    enum: ["FFCS", "NON-FFCS","CORE"],
    required: true,
  },

  reg_no: {
    type: String,
    required: false,
  },
});

const Members = mongoose.model("members", Member);
module.exports = Members;
