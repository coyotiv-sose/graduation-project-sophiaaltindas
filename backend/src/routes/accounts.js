const express = require('express')
const router = express.Router()

const User = require('../models/user')
const app = require('../app')
const passport = require('passport')

router.get('/session', async function (req, res, next) {
  res.send(req.user)
})

router.post('/session', passport.authenticate('local', { failWithError: true }), function (req, res) {
  res.send(req.user)
})

router.delete('/session', function (req, res) {
  req.logout(() => {
    res.sendStatus(200)
  })
})

module.exports = router
