const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberEmailList = new Schema({
  emails: [String],
});

const Members = mongoose.model("EmailList", MemberEmailList);
module.exports = MemberEmailList;
