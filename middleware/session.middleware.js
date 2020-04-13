const shortid = require('shortid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports =  function(req, res, next) {
    // cookie = req.signedCookies.userId
    let id = shortid.generate()
    if(!req.signedCookies.userId && !req.signedCookies.sessionID) {
        res.cookie('sessionID', id, { signed: true })
        db.get('sessionID').push({ id: id}).write();
    }
    // console.log(cookie)
    next()
}