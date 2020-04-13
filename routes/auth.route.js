var express = require('express')
// const db = require('../db')
const controller = require('../controller/auth.controller.js')
// const validate = require('../validate/user.validate.js')

var router = express.Router()

router.get('/login', controller.login)

router.post('/login', controller.postLogin)


module.exports = router