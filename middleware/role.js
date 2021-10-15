const { decodeToken } = require("../utils/token");

// Models
const Members = require("../models/members");

// aggr pipeline
const memberRolePipeline = require("../aggregationPipeline/memberRolePipeline");

const verifyRole = (role) => {
  return (req, res, next) => {
    const d = decodeToken(req.header("ac_token"));
    const h = req.header('X-AC-SUPER-ADMIN');
    const o = req.header('orgId');
    if (h == process.env.X_AC_SUPER_ADMIN){
        req.superadmin = true
        req.email = "*"
        next();
    } else if(o) {
      const r = Members.aggregate(memberRolePipeline.getUserRoleInOrg(email,o))

      if (r.org?.role <= role) {
        req.email = d.email  
        req.orgId = orgId
        next();
      } else {
        res.status(401).send();
      }
    }
    else {  
      res.status(401).send();  
    }
  };
};

module.exports = verifyRole;
