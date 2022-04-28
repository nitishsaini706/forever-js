const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const product = require('./models/product');
//setting mongoose 
main().catch(err => console.log(err));

async function main () {
  await mongoose.connect('mongodb://localhost:27017/farmStand');
  console.log('mongoose connected');
}

app.set('views',path.join(__dirname , 'views'));
app.set('view engine','ejs');


app.get('/products', async (req,res)=>{
    const products = await product.find({});
    res.render('product',{products})
})
app.listen(3000,()=>{
    console.log("App listening on port 3000!!!");
})