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
    product : [
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref:product
        }
        
    ]
        
    
})


const farm = mongoose.model('farm',farmSchema);


module.exports = farm;