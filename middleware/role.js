const { decodeToken } = require("../utils/token");

const verifyRole = (role) => {
  return (req, res, next) => {  
    const d = decodeToken(req.header["AC_TOKEN"]);
    const h = req.header('X-AC-SUPER-ADMIN');
    if (h == process.env.X_AC_SUPER_ADMIN){
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
