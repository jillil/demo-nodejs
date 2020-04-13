const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
var mongoose = require('mongoose');
var Product = ('../model/product.model.js')
mongoose.connect('mongodb://localhost/express-demo', {useNewUrlParser: true});


module.exports.products= function(req,res) {
    let products = db.get('products').value()
    let page = parseInt(req.query.page) || 1
    let perPage = 8
    let begin = (page * 8) - perPage
    let nextPage ={}
    let prePage ={}
    let endPage ={}

    nextPage.number = page + 1
    nextPage.url = `/products?page=`+(page+1)

    prePage.number = page - 1
    prePage.url = `/products?page=`+(page-1)

    endPage.number = parseInt(Math.floor(db.get('products').size()/8)+1)
    endPage.url = `/products?page=`+parseInt(Math.floor(db.get('products').size()/8)+1)

    if (page===1) {
        checkTop='disabled'
        checkPre='sr-only'
    }else {
        checkTop=''
        checkPre=''
    }
    if (page===endPage.number) {
        checkEnd='disabled'
        checkNext='sr-only'
    }else {
        checkEnd=''
        checkNext=''
    }

    let sessionId = req.signedCookies.sessionID
    let cart = db.get('sessionID')
    .find({ id:sessionId })
    .get('cart')
    .value()
    if (cart) {
        var result = 0;
        Object.keys(cart).map(function(key) {
            result += cart[key]
        });
    }

    res.render('product',{
        products: db.get('products').drop(begin).take(perPage).value(),
        nextPage: nextPage,
        prePage: prePage,
        endPage: endPage,
        curPage: {
            number:page,
            url:`/products?page=`+page
        },
        checkTop: checkTop,
        result: result
    })

    Product.find().then(function(products) {
        res.render('product', {
            products: products
        })
    })
}

module.exports.cart = function(req, res, next) {
    // let productId = parseInt(req.params.id)
    // let page = parseInt(req.query.page)
    let sessionId = req.signedCookies.sessionID
    let productId = req.params.id
    let count = db.get('sessionID')
    .find({ id:sessionId })
    .get(`cart.${productId}`, 0)
    .value() 
    console.log(count)

    db.get('sessionID')
    .find({ id:sessionId })
    .set(`cart.${productId}`, count+1)
    // .write()

    // res.redirect('/products?page='+page)
    res.redirect('/products')
    next()

}