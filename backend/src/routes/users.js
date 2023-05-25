var express = require('express')
const User = require('../models/user')
const { celebrate, Joi, errors, Segments } = require('celebrate')
var router = express.Router()
const multer = require('multer')

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../uploads/avatar`)
  },
  filename: (req, file, cb) => {
    cb(null, `avatar-${Date.now()}-${file.originalname.replace(/[^a-zA-Z\.]/g, '')}`)
  },
})

const upload = multer({ storage: avatarStorage })

/* GET users listing. */
router.get('/', async function (req, res, next) {
  //res.send(User.list.map(user => ({ name: user.name, meetings: user.meetings.map(meeting => meeting.getName()) })))
  const users = await User.find()
  res.render('users', { title: 'LETSGO', users })
})

/* Create a new user. */
// router.post('/', async function (req, res, next) {
//   const user = await User.create({ name: req.body.name })

//   res.send(user)
// })

router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  async function (req, res, next) {
    const { name, email, password } = req.body

    const user = await User.register({ name, email }, password)

    res.send(user)
  }
)

router.post('/profile', upload.single('avatar'), async function (req, res) {
  console.log('FILE', req.file)

  const url = `/avatar/${req.file.filename}`

  await req.user.updateAvatar(url)

  res.send({ message: 'success' })
})

module.exports = router
