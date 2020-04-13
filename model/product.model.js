var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

var Schema = new mongoose.Schema ({
    name:  String,
    image: String,
    description: String
});

var Product = mongoose.model('Product',Schema);

module.exports = Product;