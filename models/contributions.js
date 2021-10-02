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
});

const Contribution = new Schema(
  {
    email: String,
    score: Number,
    timeline: [Timeline],
  },
  {
    timestamps: true,
  }
);

const Contribs = mongoose.model("Contributions", Contribution);
module.exports = Contribs;
