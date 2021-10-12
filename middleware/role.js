const { decodeToken } = require("../utils/token");

const verifyRole = (role) => {
  return (req, res, next) => {  
    const d = decodeToken(req.header["ac_token"]);
    const h = req.header('X-AC-SUPER-ADMIN');
    if (h == process.env.X_AC_SUPER_ADMIN){
        req.superadmin = true
        next();
    } else if(d?.role <= role) {
        next();
    }
    else {
      console.log(d,h,req.header["ac_token"]);  
      res.status(401).send();  
    }
  };
};

module.exports = verifyRole;
