const mongoose = require('mongoose');
const product = require('./models/product');
//setting mongoose 
main().catch(err => console.log(err));

async function main () {
  await mongoose.connect('mongodb://localhost:27017/farmStand');
  console.log('mongoose connected');
}

// const seed = new product({name:'seed',price:15,category:'vegetable'
// });
// seed.save()
// .then(data =>{
//     console.log(data);
// })
// .catch(err => {
//     console.log("Errors!!!");
//     console.log(err);
// })

const items = [
    {
        name:'seed',price:15,category:'vegetable'   
    },
    {name:'milk',price:45,category:'dairy'},
    {name:'chicken',price:105,category:'dairy'},
    {name:'melon',price:30,category:'fruit'}
]
product.insertMany(items)
.then(data =>{
        console.log("inserted data");
    })
    .catch(err => {
        console.log("Errors!!!");
        console.log(err);
    })