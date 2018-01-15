/* eslint-disable */
const express = require('express');
const redisDb = require('../utils/redis_db');
const localAuth = require('../auth/local');
const jwt = require('jwt-simple');
const authHelpers = require('../auth/_helpers');
const twilio = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)

const router = express.Router();

router.get('/getUser', authHelpers.ensureAuth, (req, res) => {
  return req.pay.success? res.status(200).json({status: "User Exist"}) : res.status(404).json({status: "User not found"})
})

router.post('/login', async (req, res) => {
  const username = req.body.username;
  const user = await redisDb.findUser(username);
  if (!user.success) {
    throw new Error(user.msg)
  }
  let obj = user.msg
  obj.code = Math.floor(Math.random() * 90000) + 10000
  const updatedVal = await redisDb.updateValue(username, obj)
  if (!updatedVal.success) {
    throw new Error(updatedVal.msg)
  }
  twilio.messages.create({
    to: user.msg.phone,
    from: process.env.PHONE_FROM,
    body: obj.code
  }, (err, message) => err ? res.status(500).json({ error: err }) : res.status(200).json(user))
})

router.post('/verify', authHelpers.ensureAuth, async (req, res) => {
  if (!req.pay.success) {
    return res.status(404).json({msg: 'not found'})
  }
  return req.body.code !== req.pay.msg.code ? 
    res.status(400).json({
      msg: "code not valid"
    }) :
    res.status(200).json({
      status: 'success',
      msg: 'Code is valid',
      code: req.pay.msg.code
    })
  }
)

module.exports = router;