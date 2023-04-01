var express = require('express')
var router = express.Router()
const User = require('../models/user')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('users', { title: 'LETSGO', users: User.list })
})

module.exports = router
