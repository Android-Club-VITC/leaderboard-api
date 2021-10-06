const express = require("express");

// utils

// Models
const Members = require("../models/members");
const Contributions = require("../models/contributions");

const router = express.Router();

router.post("/addMember", async (req, res) => {
  try {
    const { name, email, department, role, member_type, reg_no } = req.body;
    const u = new Members({
      name,
      email,
      department,
      role,
      member_type,
      reg_no,
    });
    await u.save();

    const c = new Contributions({
      score: 0,
      member: u,
      email,
      timeline: [],
    });
    await c.save();

    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// TODO: add contribution
router.post("/addContribution", async (req, res) => {
  try {
    const { email, contribs } = req.body;
    const s = contribs.reduce((a, b) => a.points + b.points, { points: 0 });
    const c = await Contributions.findOneAndUpdate(
      { email },
      {
        $push: { timeline: { $each: contribs } },
      }
    );
    c.score = c.score + s;
    await c.save();

    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
