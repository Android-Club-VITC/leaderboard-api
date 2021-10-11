const express = require("express");
const axios = require("axios");

// utils
const { EMAIL_SERVICE } = require("../utils/endpoints");

// Models
const Members = require("../models/members");
const Contributions = require("../models/contributions");

const router = express.Router();

router.post("/addMember", async (req, res) => {
  try {
    const { name, email, department, role, member_type } = req.body;
    const u = new Members({
      name,
      email,
      department,
      role,
      member_type,
    });
    await u.save();

    const c = new Contributions({
      score: 0,
      member: u,
      email,
      timeline: [],
    });
    await c.save();

    //TODO: send otp
    await axios.post(`${EMAIL_SERVICE}/api/mail/text`,{
      to: email,
      subject: "Registered to Android Club Leaderboard",
      text: `You have been added as a member of android club and now you have full access to Leaderboard App. Enjoy!! <br />(This is an auto-generated mail, no need to reply to it)`
    })

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
