const express = require('express')
const app = express()

const Auth = require('./routes/auth');

app.use(express.json());

app.use('/api/auth',Auth)

app.get('/health', function (req, res) {
  res.send('200 OK')
})

app.listen(4000)
