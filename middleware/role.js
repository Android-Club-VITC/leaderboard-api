const { decodeToken } = require("../utils/token");

// Models
const Members = require("../models/members");

// aggr pipeline
const memberRolePipeline = require("../aggregationPipeline/memberRolePipeline");

const verifyRole = (role) => {
  return async (req, res, next) => {
    try {
      const d = decodeToken(req.header("ac_token"));
      const h = req.header("X-AC-SUPER-ADMIN");
      const o = req.header("ac_orgId");
      if (h == process.env.X_AC_SUPER_ADMIN) {
        req.superadmin = true;
        req.email = "*";
        req.orgId = o
        next();
      } else if (o) {
        let r = await Members.aggregate(
          memberRolePipeline.getUserRoleInOrg(d.email, o)
        );
        r = r[0];
        if (r?.org.role <= role) {
          req.email = d.email;
          req.orgId = o;
          next();
        } else {
          res.status(401).send();
        }
      } else {
        res.status(401).send();
      }
    } catch (e) {
      console.log(e)
      res.status(400).send();
    }
  };
};

module.exports = verifyRole;
