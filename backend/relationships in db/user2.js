const mongoose = require('mongoose');

main().catch(e => console.log("error occured" , e));

async function main()
{

    await mongoose.connect('mongodb://localhost:27017/relationshipDemo' , {useNewUrlParser:true , useUnifiedTopology:true});
    console.log("db connected");

}

//one to many approach , we store data separtely in other file and use their references to document id inside the parent

const productSchema = new mongoose.Schema({
    name:String,
    city:String,
    category:{
        enums:['Tech','Grocery','Lifestyle']
    }
})
const factorySchema = new mongoose.Schema({
    name:String,
    city:String,
    products: [{ type: mongoose.Schema.Types.ObjectId , ref:'Product'}]
})


const Product = mongoose.model('Product' , productSchema);
const Factory = mongoose.model('Factory',factorySchema);

const fac = async() => {
    const farm = new Factory({name:'outllet',city:'amrt'})
    const mouse = await Product.findOne({name:'MOuse'});
    // console.log(mouse);
    farm.products.push(mouse);
    await farm.save();
    // console.log(farm);

    

}
fac();

// this will not show the full products just their id
// Factory.findOne({name:'outllet'}).then(farm => console.log(farm));

// this will show all the products along with their name ,etc etc 
// we use populate with the schema we ref to 
Factory.findOne({name:'outllet'}).populate('products').then(farm => console.log(farm));

//create project 

// const createProduct = async ()=>{
//     const product = new Product({
//         name:'MOuse',
//         city:'ptk',
//         category:'Tech'
//     })

//     const res = await product.save();
//     console.log(res);
// }

// createProduct();
