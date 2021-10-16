const express = require("express");
const axios = require("axios");
const objectId = require("mongoose").Types.ObjectId;

// utils
const { EMAIL_SERVICE } = require("../utils/endpoints");
const generateUname = require("../utils/uname");

// Models
const Members = require("../models/members");
const Contributions = require("../models/contributions");


module.exports = {
  addMember: async (req, res) => {
    try {
      const { email, department, role, member_type } = req.body;
      const orgId = req.orgId;

      let m = await Members.findOne({ email });

      const orgInfo = {
        orgId: objectId(orgId),
        department,
        role,
        member_type,
      };
      if (m) {
        const t = await Members.findOne({
          email,
          "org.orgId": objectId(orgId),
        });

        if (!t) {
          await Members.findOneAndUpdate(
            { email },
            {
              $push: { org: orgInfo },
            }
          );
        } else {
          res.status(400).send();
        }
      } else {
        m = new Members({
          name: generateUname(),
          email,
          org: [orgInfo],
        });
        await m.save();
      }

      const c = new Contributions({
        member: m,
        org: objectId(orgId),
        email,
        timeline: [],
      });
      await c.save();

      //TODO: send otp
      await axios.post(`${EMAIL_SERVICE}/api/mail/text`, {
        to: email,
        subject: "Registered to an Organization Leaderboard",
        text: `You have been added as a member and now you have full access to Leaderboard App developed by Android Club. Enjoy!! (This is an auto-generated mail, no need to reply to it)`,
      });

      res.status(201).send();
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  },
};
