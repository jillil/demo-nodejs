const db = require('../db')

module.exports.auth =  function(req, res, next) {
    cookie = req.signedCookies.userId
    if(!cookie) {
        return res.redirect('/auth/login')
    }
    let user=db.get('users')
    .find({ id: cookie })
    .value()
    if(!user) {
        return res.redirect('/auth/login')
    }

    // console.log(cookie)
    // console.log(user)
    next()
}