const express = require("express");
const router = express.Router();

// models
const Contributions = require("../models/contributions");


// TODO: get contribution data of each member in sorted order
router.get("/getAllContribution", async (req, res) => {
  try {
    const result = await Contributions.find({}, { _id: 0, timeline: 0, email: 0 })
      .sort({ score: -1, updatedAt: 1 })
      .populate("member",{name: 1, _id: 0})
      .lean();
    res.send(result);
  } catch (e) {
    console.log(e);  
    res.status(500).send();
  }
});

module.exports = router;
