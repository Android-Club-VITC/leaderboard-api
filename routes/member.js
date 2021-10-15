const express = require("express");
const router = express.Router();

// models
const Members = require("../models/members");
const Contributions = require("../models/contributions");

// pipeline
const contributionsPipeline = require("../aggregationPipeline/contributionsPipeline");

router.post("/getInfo", async (req, res) => {
  try {
    const { email } = req.body;

    if (!req?.superadmin && req?.email !== email) res.status(401).send();
    else {
      const result = await Members.findOne(
        { email },
        { _id: 0, "socials._id": 0, opt: 0 }
      ).lean();
      res.send(result);
    }
  } catch (e) {
    res.status(500).send();
  }
});

// TODO: get contribution data of each member in sorted order
router.get("/getAllContribution", async (req, res) => {
  try {
    const result = await Contributions.aggregate(
      contributionsPipeline.getAllMemberContributionDetails
    );
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// TODO: get contribution data of a member
router.post("/getContribution", async (req, res) => {
  try {
    const { email } = req.body;
    const result = await Contributions.aggregate(
      contributionsPipeline.getMemberContributionDetails(email)
    );
    res.send(result);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/editSocials", async (req, res) => {
  try {
    const { email, socials } = req.body;
    const m = await Members.findOneAndUpdate(
      { email },
      {
        socials,
      }
    );
    m.save();
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
