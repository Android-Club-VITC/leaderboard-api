const express = require("express");

// models
const Organizations = require("../models/organizations");

// controller
const adminController = require("../controllers/admin");

const router = express.Router();

router.post("/addOrg", async (req, res, next) => {
  try {
    const { orgName } = req.body;
    const role = 1;
    const { email, member_type, department } = req.body.admin;

    const o = await Organizations({
      name: orgName
    });
    await o.save();
    req.headers['AC_ORGID'] = o._id;
    req.body = {
      email,
      role,
      member_type,
      department,
    };
    next();
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
}, adminController.addMember);

module.exports = router;
