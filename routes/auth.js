const express = require("express");
const axios = require("axios");

// middleware
const verifyRole = require("../middleware/role");

// utils
const { createToken, decodeToken } = require("../utils/token");
const generateOtp = require("../utils/otp");
const { EMAIL_SERVICE } = require("../utils/endpoints");

// Models
const Members = require("../models/members");

// pipeline
const userOrgInfoPipeline = require("../aggregationPipeline/userOrgInfoPipeline");

const router = express.Router();

// TODO: /verifyEmail
router.post("/verifyEmail", async (req, res) => {
  try {
    const { email } = req.body;
    const result = await Members.find({ email });
    if (result) {
      // generate otp
      const otp = generateOtp();
      result.otp = otp;
      await Members.findOneAndUpdate({ email }, { $set: { otp } });

      //TODO: send otp
      await axios.post(`${EMAIL_SERVICE}/api/mail/text`,{
        to: email,
        subject: "OTP | Android Club",
        text: `Your One Time Password (OTP): ${otp}`
      }) 

      res.status(200).send();
    } else {
      res.status(401).send();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// verify
router.get("/verify", async (req, res) => {
  try {
    const d = decodeToken(req.header("ac_token"));
    let result = await Members.aggregate(userOrgInfoPipeline.getUsersAllOrgInfo(d.email));
    result = result[0]
    res.send({ org: result.org_info });
  } catch(e) {
    res.status(401).send();
  }
})

// TODO: /loginIn
router.post("/login", async (req, res) => {
  try {
    const { email, otp } = req.body;
    let result = await Members.aggregate(userOrgInfoPipeline.getUsersAllOrgInfo(email));
    result = result[0];
    if (result) {
      // check if otp is expired
      if (result.otp > 999 && result.otp == parseInt(otp)) {
        
        // TODO: remove opt
        await Members.updateOne({email},{$set: {otp: -1}});

        // generate token
        const token = createToken(email, result.role);

        // set token in cookie
        res.set("AC_TOKEN", token);
        
        res.send({ org: result.org_info });
      } else {
        res.status(401).send();
      }
    } else {
      res.status(400).send();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
