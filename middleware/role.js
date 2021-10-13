const { decodeToken } = require("../utils/token");

const verifyRole = (role) => {
  return (req, res, next) => {
    const d = decodeToken(req.header("ac_token"));
    const h = req.header('X-AC-SUPER-ADMIN');
    if (h == process.env.X_AC_SUPER_ADMIN){
        req.superadmin = true
        req.email = "*"
        next();
    } else if(d?.role <= role) {
      req.email = d.email  
      next();
    }
    else {  
      res.status(401).send();  
    }
  };
};

module.exports = verifyRole;
