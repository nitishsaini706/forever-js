const { default: mongoose } = require('mongoose');
const monggose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price : {
        type:Number,
        require:true,
        min:0
    },
    category: {
        type:String,
        enum:['fruit','vegetable','dairy']
    }
})

const product = mongoose.model('product',productSchema);

module.exports  =product;