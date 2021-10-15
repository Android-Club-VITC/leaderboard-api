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
    const { email, department, role, member_type } = req.body;
    const orgId = req.orgId;

    const m = await Members.find({email}).lean()
    
    const orgInfo = {
      orgId,
      department,
      role,
      member_type
    }

    if (m) {
      const u = await Members.findOneAndUpdate(
        { email },
        {
          $push: { org: orgInfo },
        }
      );
      await u.save();  
    }
    else {
      const u = new Members({
        email,
        org: [orgInfo]
      });
      await u.save();
    }

    const c = new Contributions({
      member: u,
      org: orgId,
      email,
      timeline: [],
    });
    await c.save();

    //TODO: send otp
    await axios.post(`${EMAIL_SERVICE}/api/mail/text`,{
      to: email,
      subject: "Registered to an Organization Leaderboard",
      text: `You have been added as a member and now you have full access to Leaderboard App developed by Android Club. Enjoy!! (This is an auto-generated mail, no need to reply to it)`
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
    const orgId = req.orgId;
    const { email, contribs } = req.body;
    const c = await Contributions.findOneAndUpdate(
      { email, org: orgId },
      {
        $push: { timeline: { $each: contribs } },
      }
    );    
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
