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
      type: String,
      unique: true
    },
    
    member: {
      type: Schema.Types.ObjectId,
      ref: "members"
    },

    score: Number,
    
    timeline: [Timeline],
  },
  {
    timestamps: true,
  }
);

const Contribs = mongoose.model("contributions", Contribution);
module.exports = Contribs;
