const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/movieApp');
  console.log('working');
}

const productSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    price:Number ,
    onSale : {
        type:Boolean,
        default:false
    }
});

// this work on instance of the db
productSchema.methods.toggleOnSale = function()
{
    this.onSale= !this.onSale;
    return this.save();
}

//this works on whole model 

productSchema.statics.fireSale = function() {
    return this.updateMany ({}, { onSale:true , price:0})
}

const product = mongoose.model('product',productSchema);

const bike = new product({name:'yo bike',price:65000});

bike.save()
// .then(data =>{
//     console.log("WRoked");
//     console.log(data);
// })
// .catch(err =>{
//     console.log("error ");
//     console.log(err);
// })

// const findProduct = async () => {
//     const foundProduct = await product.findOne({name : 'yo bike'});
//     console.log(foundProduct);
//     await foundProduct.toggleOnSale();
//     console.log(foundProduct);
// }

product.fireSale().then(data => console.log(data));

// findProduct();