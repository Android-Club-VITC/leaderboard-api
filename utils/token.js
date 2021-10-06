const jwt = require("jsonwebtoken");

const createToken = (email, role) => {
  const t = jwt.sign(
    {
      role,
      email,
      iss: process.env.JWT_ISSUER,
    },
    process.env.JWT_CERT,
    { expiresIn: "30 days" }
  );
  return t;
};

const decodeToken = (token) => {
  try {
    var decoded = jwt.verify(token, process.env.JWT_CERT, { issuer: process.env.JWT_ISSUER });
    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = {
  createToken,
  decodeToken,
};
