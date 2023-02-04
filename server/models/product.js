const mongoose = require('mongoose');
const productSchema = new mongoose.Schema ({
    name:{
        type : String,
    },
    price:{
        type : Number,
    },
    img:{
        type : String
    },

})

const Product = mongoose.model("Product",productSchema);

module.exports = Product