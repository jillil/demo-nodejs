var express = require('express')
const controller = require('../controller/product.controller.js')

var router = express.Router()
router.get('/', controller.products)
router.get('/cart/:id', controller.cart)

module.exports = router
