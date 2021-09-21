const express = require('express')

const router = express.Router()

// TODO: /verifyEmail

// TODO: /signin

router.get('/',(req,res)=>{
    res.send("get")
})

module.exports = router;