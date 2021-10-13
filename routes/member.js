const express = require("express");
const router = express.Router();

// models
const Members = require("../models/members");
const Contributions = require("../models/contributions");

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
    const result = await Contributions.find({}, { _id: 0, "timeline._id": 0 })
      .sort({ score: -1, updatedAt: 1 })
      .populate("member", { name: 1, _id: 0 })
      .lean();
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
    const result = await Contributions.findOne(
      { email },
      { _id: 0, "timeline._id": 0 }
    )
      .populate("member", { name: 1, _id: 0 })
      .lean();
    res.send(result);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
