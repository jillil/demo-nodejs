let db = require('../db')
var users = db.get('users').value()
var md5 = require('md5');

module.exports.login =  function(req,res) {
    res.render('login')
    // console.log(1)
}

module.exports.postLogin =  function (req, res) {
    let errors=[];
    let email = req.body.email
    // console.log(email)
    let password = req.body.password
    // console.log(password)

    let user=db.get('users')
    .find({ email: email })
    .value()
    // console.log(user)
    if (!user) {
        errors.push('user is not exits!')
        return res.render('login',{
            errors:errors,
            values:req.body
        });
    }
    let hashPassword = md5(password)
    if (user.password !== hashPassword) {
        errors.push('wrong password!')
        return res.render('login',{
            errors:errors,
            values:req.body
        });
    }
    let id = user.id
    res.cookie('userId', id, { signed: true })
    res.render('wc',{
        user:user
    });
    // console.log(user.id)
}
