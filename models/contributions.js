const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Timeline = new Schema({
  points: {
    type: Number,
    default: 0,
  },
  remarks: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
});

const Contribution = new Schema(
  { 
    email: {
      type: String
    },
    
    org: {
      type: Schema.Types.ObjectId,
      ref: "organizations"
    },

    member: {
      type: Schema.Types.ObjectId,
      ref: "members"
    },

    timeline: [Timeline],
  },
  {
    timestamps: true,
  }
);

const Contribs = mongoose.model("contributions", Contribution);
module.exports = Contribs;
