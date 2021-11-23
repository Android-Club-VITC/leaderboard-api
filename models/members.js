const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Socials = new Schema({
  linkedin: String,
  discord: String,
  github: String,
  instagram: String,
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

  avatar: {
    type: String,
  },

  org: [
    {
      orgId: {
        type: Schema.Types.ObjectId,
        ref: "organizations"
      },

      role: {
        type: Number,
        default: 2,
        enum: [1, 2],
        required: true,
      },
      
      department: {
        type: String,
        required: false,
      },
      
      member_type: {
        type: String,
        enum: ["FFCS", "NON-FFCS","CORE"],
        required: false,
      },
    }
  ],

  socials: Socials,

  otp: {
    type: Number,
    required: false,
  },
});

const Members = mongoose.model("members", Member);
module.exports = Members;
