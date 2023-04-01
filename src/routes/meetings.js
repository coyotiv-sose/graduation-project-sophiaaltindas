var express = require('express')
const Meeting = require('../models/meeting')
const User = require('../models/user')
var router = express.Router()

/* GET meetings listing. */
router.get('/', function (req, res, next) {
  //res.send(Meeting.list)
  res.render('meetings', { meetings: Meeting.list })
})

/* Create a new meeting */
router.post('/', function (req, res, next) {
  const user = User.list.find(user => user.name === req.body.user)
  const meeting = user.createMeeting(req.body.name, req.body.location, req.body.date)

  res.send({ name: meeting.name, location: meeting.location, date: meeting.date })
})

//create a new meeting for a user
router.post('/:meetingID/attendees', function (req, res, next) {
  if (req.query.view === 'json')
    return res.send(
      Meeting.list.map(meeting => ({
        name: meeting.name,
        location: meeting.location,
        date: meeting.date,
        attendees: meeting.attendees.map(attendee => attendee.name),
      }))
    )
})

module.exports = router
