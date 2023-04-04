var express = require('express')
const User = require('../models/user')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  //res.send(User.list.map(user => ({ name: user.name, meetings: user.meetings.map(meeting => meeting.getName()) })))
  res.render('users', { title: 'LETSGO', users: User.list })
})

/* Create a new user. */
router.post('/', async function (req, res, next) {
  const user = await User.create({ name: req.body.name })

  res.send(user)
})

module.exports = router
