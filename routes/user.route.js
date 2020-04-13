var express = require('express')
var multer  = require('multer')

const controller = require('../controller/user.controller.js')
const validate = require('../validate/user.validate.js')
const middleware = require('../middleware/auth.middleware.js')

var upload = multer({ dest: './public/uploads/' })

var router = express.Router()

router.get('/', middleware.auth, controller.user)

router.get('/search', middleware.auth, controller.search)

router.get('/create', middleware.auth, controller.create)

router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate)

router.get('/:name', middleware.auth, controller.viewUser)

module.exports = router