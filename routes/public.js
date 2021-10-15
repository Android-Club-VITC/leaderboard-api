const express = require("express");
const router = express.Router();

// models
const Contributions = require("../models/contributions");

// pipeline
const contributionsPipeline = require("../aggregationPipeline/contributionsPipeline");

// TODO: get contribution data of each member in sorted order
router.get("/getAllContribution", async (req, res) => {
  try {
    const result = await Contributions.aggregate(contributionsPipeline.getAllMemberPublicContributionDetails)
    res.send(result);
  } catch (e) {
    console.log(e);  
    res.status(500).send();
  }
});

module.exports = router;
