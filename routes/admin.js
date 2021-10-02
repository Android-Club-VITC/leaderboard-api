const express = require("express");

// utils

// Models
const Members = require("../models/members");
const MemberEmailList = require("../models/memberEmailList");
const Contributions = require("../models/contributions");

const router = express.Router();

router.post("/addMember", async (req, res) => {
  try {
    const { email, department, role } = req.body;
    const u = new Members({email,department,role});
    await u.save();
    res.status(201).send();
  } catch (e) {
    res.status(500).send();
  }
});

// TODO: add contribution
router.post("/addContributions", async (req, res) => {
  try {
    const { email, contribs } = req.body;
    await Contributions.findOneAndUpdate(
      { email },
      {
        $push: { timeline: { $each: contribs } },
      }
    );
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
