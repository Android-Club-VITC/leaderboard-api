const express = require("express");
const axios = require("axios");
const objectId = require("mongoose").Types.ObjectId;

// utils
const { EMAIL_SERVICE } = require("../utils/endpoints");
const generateUname = require("../utils/uname");

// Models
const Members = require("../models/members");
const Contributions = require("../models/contributions");

// controller
const adminController = require("../controllers/admin");

const router = express.Router();

router.post("/addMember", adminController.addMember);

// TODO: add contribution
router.post("/addContribution", async (req, res) => {
  try {
    const orgId = req.orgId;
    const { email, contribs } = req.body;
    const c = await Contributions.findOneAndUpdate(
      { email, org: objectId(orgId) },
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
