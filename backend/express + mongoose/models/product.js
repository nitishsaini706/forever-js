const mongoose = require('mongoose');
const farm = require('./farm')

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
    },
    farm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'farm'
    }
})

const product = mongoose.model('product',productSchema);

module.exports  =product;