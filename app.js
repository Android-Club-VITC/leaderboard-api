const express = require('express')
const cookieParser = require("cookie-parser");

const app = express()

// auth endpoint handler
const Auth = require('./routes/auth');

// parses string to json 
app.use(express.json());
// parses cookie
app.use(cookieParser());

// auth endpoint
app.use('/api/auth',Auth)

// test endpoint
app.get('/health', function (req, res) {
  res.send('200 OK')
})

module.exports = app;
