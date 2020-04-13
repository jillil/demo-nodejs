const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express-demo', {useNewUrlParser: true});

console.log(process.env.SESSION_SERCET)
const routerUser = require('./routes/user.route.js')
const routerAuth = require('./routes/auth.route.js')
const routerProduct = require('./routes/product.route.js')
const sessionMiddleware = require('./middleware/session.middleware.js')

const app = express()
const port = 3000

app.set('view engine', 'pug')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SERCET))

app.use(express.static('public'));
app.use(sessionMiddleware)

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: '!' })
  })

app.use('/user', routerUser)
app.use('/auth', routerAuth)
app.use('/products', routerProduct)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))