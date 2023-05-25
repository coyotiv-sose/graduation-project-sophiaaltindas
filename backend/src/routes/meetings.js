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

router.get('/:id', async function (req, res, next) {
  const meeting = await Meeting.findById(req.params.id)

  if (!meeting) return next({ status: 404, message: 'The meeting with the given ID was not found.' })

  res.send(meeting)
})

/* Create a new meeting */
router.post('/', async function (req, res, next) {
  //const user = await User.findById(req.body.user)
  const meeting = await req.user.createMeeting(
    req.body.name,
    req.body.location,
    req.body.date,
    req.body.limit,
    req.body.description
  )

  res.send(meeting)
})

//join a meeting
router.post('/:meetingID/attendees', async function (req, res, next) {
  // if (req.query.view === 'json')
  //const user = await User.findById(req.body.user)
  const meeting = await Meeting.findById(req.params.meetingID)

  // Path 1
  req.user
    .joinMeeting(meeting)
    .then(data => {
      res.send()
    })
    .catch(error => {
      res.status(400).send(error.message)
    })

  // Path 2
  // try {
  //   await req.user.joinMeeting(meeting)
  //   res.send()
  // } catch (error) {
  //   res.status(400).send(error.message)
  // }
})

//leave a meeting
router.delete('/:meetingID/attendees', async function (req, res, next) {
  const meeting = await Meeting.findById(req.params.meetingID)

  req.user
    .leaveMeeting(meeting)
    .then(data => {
      res.send()
    })
    .catch(error => {
      res.status(400).send(error.message)
    })
})

router.delete('/:meetingID', async function (req, res, next) {
  const meeting = await Meeting.findById(req.params.meetingID)

  req.user
    .deleteMeeting(meeting)
    .then(data => {
      res.send()
    })
    .catch(error => {
      res.status(400).send(error.message)
    })
})

module.exports = router
