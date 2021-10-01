const serverless = require("serverless-http")

// loading env variables
const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const app = express()

// auth endpoint handler
const Auth = require('./routes/auth');

// parses string to json 
app.use(express.json());

// auth endpoint
app.use('/api/auth',Auth)

// test endpoint
app.get('/health', function (req, res) {
  res.send('200 OK')
})

if(!process.env.IS_SERVERLESS){
  app.listen(4000)
}

module.exports.handler = serverless(app);
