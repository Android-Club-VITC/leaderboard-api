const express = require("express");

// utils
const { createToken } = require("../utils/token");
const generateOtp = require("../utils/otp");

// Models
const Members = require("../models/members");

const router = express.Router();

// TODO: /verifyEmail
router.post("/verifyEmail", async (req, res) => {
  try {
    const { email } = req.body;
    const result = await Members.find({ email });
    if (result) {
      // generate opt
      const opt = generateOtp();
      result.opt = opt;
      await Members.findOneAndUpdate({ email }, { $set: { opt } });

      //TODO: send opt

      res.status(200).send();
    } else {
      res.status(401).send();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// TODO: /loginIn
router.post("/loginIn", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await Members.findOne({ email })
    if (result) {
      // check if otp is expired
      console.log(result.opt,otp);
      if (result.opt > 999 && result.opt == parseInt(otp)) {
        // TODO: remove opt
        result.opt = -1;
        await result.save();

        // generate token
        const token = createToken(email, result.role);

        // set token in cookie
        res.cookie("ac_token", token, {
          maxAge: 86400 * 1000 * 30, // 30 days
          httpOnly: true, // http only, prevents JavaScript cookie access
          secure: false, // cookie must be sent over https / ssl
        });

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
