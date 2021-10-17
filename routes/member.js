const express = require("express");
const router = express.Router();

const objectId = require("mongoose").Types.ObjectId;

// models
const Members = require("../models/members");
const Contributions = require("../models/contributions");

// pipeline
const contributionsPipeline = require("../aggregationPipeline/contributionsPipeline");
const calculateScorePipeline = require("../aggregationPipeline/calculateScore");

// service 
const { AVATAR_SERVICE } = require("../utils/endpoints");

router.post("/getInfo", async (req, res) => {
  try {
    const { email } = req.body;
    const result = await Members.findOne(
      { email, "org.orgId": objectId(req.orgId) },
      { _id: 0, "socials._id": 0, otp: 0, "org.orgId": 0 }
    ).lean();
    res.send(result);
  } catch (e) {
    res.status(500).send();
  }
});

// TODO: get contribution data of each member in sorted order
router.get("/getAllContribution", async (req, res) => {
  try {
    const result = await Contributions.aggregate([
      ...contributionsPipeline.getAllMemberContributionDetails(req.orgId),
      ...calculateScorePipeline.calculateScore,
    ]);
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
    let result = await Contributions.aggregate([
      ...contributionsPipeline.getMemberContributionDetails(email, req.orgId),
      ...calculateScorePipeline.calculateScore,
    ]);
    result = result[0];
    res.send(result);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/generateAvatar", async (req, res) => {
  try {
    const { email, seed } = req.body
    if (req.email !== email) res.status(401).send();
    else {
    const avatar = `${AVATAR_SERVICE}/${encodeURIComponent(seed)}.svg`
    await Members.findOneAndUpdate({
      email
    }, {
      avatar
    })
    res.send();
  }
  } catch(e) {
    console.log(e);
    res.status(500).send();
  }
})

router.post("/editName", async (req, res) => {
  try {
    const { email, name } = req.body;
    if (req.email !== email) res.status(401).send();
    else {
      const m = await Members.findOneAndUpdate(
        { email },
        {
          name
        }
      );
      res.send();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.post("/editSocials", async (req, res) => {
  try {
    const { email, socials } = req.body;
    if (req.email !== email) res.status(401).send();
    else {
      const m = await Members.findOneAndUpdate(
        { email },
        {
          socials,
        }
      );
      res.send();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});


module.exports = router;
