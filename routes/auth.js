const express = require("express");
const axios = require("axios");

// middleware
const verifyRole = require("../middleware/role");

// utils
const { createToken } = require("../utils/token");
const generateOtp = require("../utils/otp");
const { EMAIL_SERVICE } = require("../utils/endpoints");

// Models
const Members = require("../models/members");

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

router.get("/verify", verifyRole(2), async (req, res) => {
  res.send({email: req.email});
})

// TODO: /loginIn
router.post("/loginIn", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await Members.findOne({ email })
    if (result) {
      // check if otp is expired
      console.log(result.otp,otp);
      if (result.otp > 999 && result.otp == parseInt(otp)) {
        // TODO: remove opt
        result.otp = -1;
        await result.save();

        // generate token
        const token = createToken(email, result.role);

        // set token in cookie
        res.set("AC_TOKEN", token);

        res.status(200).send();
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
