const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// auth endpoint handler
const Auth = require("./routes/auth");
const Admin = require("./routes/admin");
const Member = require("./routes/member");
const Public = require("./routes/public");

// middleware
const verifyRole = require("./middleware/role");

// parses string to json
app.use(express.json());
// parses cookie
app.use(cookieParser());

// auth endpoint
app.use("/api/auth", Auth);
app.use("/api/admin", verifyRole(1), Admin);
app.use("/api/member", verifyRole(2), Member);
app.use("/api/public", Public);

// test endpoint
app.get("/health", function (req, res) {
  res.send("200 OK");
});

module.exports = app;
