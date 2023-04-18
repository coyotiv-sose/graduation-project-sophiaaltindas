var express = require('express')
const Meeting = require('../models/meeting')
const User = require('../models/user')
var router = express.Router()

/* GET meetings listing. */
router.get('/', async function (req, res, next) {
  const meetings = await Meeting.find()
  res.send(meetings)
  //res.render('meetings', { meetings })
})

/* Create a new meeting */
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const meeting = await user.createMeeting(req.body.name, req.body.location, req.body.date, req.body.limit)

  res.send(meeting)
})

//create a new meeting for a user
router.post('/:meetingID/attendees', async function (req, res, next) {
  // if (req.query.view === 'json')
  const user = await User.findById(req.body.user)
  const meeting = await Meeting.findById(req.params.meetingID)
  user.joinMeeting(meeting).catch(error => {
    console.log(error.message)
  })

  return res.send()
})

module.exports = router
