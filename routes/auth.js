const express = require("express");

// utils
const { createToken, decodeToken } = require("../utils/token");
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
      await result.save();
      
      //TODO: send opt

      res.status(200).send();
    } else {
      res.status(401).send();
    }
  } catch (e) {
    res.status(500).send();
  }
});

// TODO: /signin
router.post("/signIn", async (req, res) => {
  try {
    const { email, opt } = req.body;
    const result = await Members.find({ email }).lean();
    if (result) {
      // check if otp is expired
      if (result?.opt == parseInt(opt)) {

        // TODO: remove opt
        await Members.findOneAndUpdate({ email }, { $unset: { opt: 1 } });

        // generate token
        const token = createToken(email);

        // set token in cookie
        res.cookie("token", token, {
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
    res.status(500).send();
  }
});

module.exports = router;
