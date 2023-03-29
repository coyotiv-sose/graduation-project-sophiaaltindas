var express = require('express')
const User = require('../user')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send([{ name: 'John' }, { name: 'Jane' }, { name: 'Jim' }])

  return

  res.render('users', {
    user: {
      name: 'John',
    },
    users: [{ name: 'John' }, { name: 'Jane' }, { name: 'Jim' }],
  })
})

/* Create a new user. */
router.post('/', function (req, res, next) {
  const user = User.create({ name: req.body.name })

  res.send(user)
})

module.exports = router
