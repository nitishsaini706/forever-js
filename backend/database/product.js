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
    price:Number 
});


const product = mongoose.model('product',productSchema);

const bike = new product({name:'yo bike',price:65000});

bike.save()
.then(data =>{
    console.log("WRoked");
    console.log(data);
})
.catch(err =>{
    console.log("error ");
    console.log(err);
})