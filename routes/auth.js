const express = require('express')
const { createToken, decodeToken } = require('../utils/token')

const router = express.Router()

// TODO: /verifyEmail

// TODO: /signin

router.post('/email',(req,res)=>{
    const {email} = req.body
    const token = createToken(email)

    res.json({token})
})

router.post('/token',(req,res)=>{
    const {token} = req.body
    const decoded = decodeToken(token)

    res.json({decoded})
})

router.get('/',(req,res)=>{
    res.send("get")
})

module.exports = router;