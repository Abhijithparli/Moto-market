const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    stock:Number

});

module.exports = mongoose.model('product',productschema);