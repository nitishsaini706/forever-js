const mongoose = require('mongoose');
const product = require('./product');


main().catch(err => console.log(err));

async function main () {
  await mongoose.connect('mongodb://localhost:27017/farmStand');
  console.log('mongoose connected');
}

const farmSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    city:String,
    email:{
        type:String,
        required:true
    },
    products: [{
        
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'product'
    }]
        
    
})

farmSchema.post('findOneAndDelete' , async function(farm)
{
    console.log(farm)
    // if(farm.products.length)
    // {
    //     const pro = await product.deleteMany( {_id : {$in : farm.products }} )
    //     console.log(pro)
    // }
})

const farm = mongoose.model('farm',farmSchema);


module.exports = farm;