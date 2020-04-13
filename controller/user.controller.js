const shortid = require('shortid')
const db = require('../db')
var users = db.get('users').value()

module.exports.user = function(req,res) {
    // console.log(db.get('users').value())
    res.render('user',{
        user: users
    })
}

module.exports.search =  function(req,res) {
    let q=req.query.q;
    let matchedUser= users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1;
    })
    // console.log(q);
    res.render('user',{
        user:matchedUser,
        q:q
    })
}

module.exports.create =  function(req,res) {
    res.render('create')
    // console.log(1)
}

module.exports.postCreate =  function (req,res) {
    req.body.id = shortid.generate();
    if (!req.file) {
        db.get('users').push(req.body).write();
        res.redirect('/user');
        return
    }
    req.body.avatar = 'uploads/'+ req.file.filename;
    db.get('users').push(req.body).write();
    res.redirect('/user');
}

module.exports.viewUser= function(req,res) {
    let id= req.params.name
    // console.log(typeof(req.params.name))
    let user=db.get('users')
    .find({ id: id })
    .value()
    // console.log(user)
    res.render('view',{
        user:user
    })
}
