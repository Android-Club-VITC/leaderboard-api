const { decodeToken } = require("../utils/token");

const verifyRole = (role) => {
  return (req, res, next) => {  
    const d = decodeToken(req.cookies["ac_token"]);
    const h = req.header('X-AC-AUTH');
    if (h == process.env.X_AC_AUTH){
        req.superadmin = true
        next();
    } else if(d?.role <= role) {
        next();
    }
    else {
        res.status(401).send();  
    }
  };
};

module.exports = verifyRole;
