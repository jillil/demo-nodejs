module.exports.postCreate =  function (req, res, next) {
    var errors=[];
    if (!req.body.name) {
        errors.push('name is require!')
        // console.log(1)
    }
    if (!req.body.phone) {
        errors.push('phone is require!')
        // console.log(2)
    }
    if(errors.length) {
        // console.log(3)
        return res.render('create',{
            errors:errors,
            values:req.body
        });
        // console.log(3)
    }
    next();
}