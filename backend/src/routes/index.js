var express = require('express')
const User = require('../models/user')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  //res.render('users', { title: 'LETSGO', users: User.list })
  //res.render('users', { title: 'LETSGO' })
  res.render('index', { title: 'LETSGO' })
})

module.exports = router
