const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override');

//setting mongoose 
main().catch(err => console.log(err));

async function main () {
  await mongoose.connect('mongodb://localhost:27017/farmStand');
  console.log('mongoose connected');
}

app.set('views',path.join(__dirname , 'views'));
app.set('view engine','ejs');

//middleWares
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//creating products page
app.get('/products', async (req,res)=>{
    const products = await Product.find({});
    res.render('products/index',{products})
})

// accessing products using id
// creating new products 
app.get('/products/new' ,(req,res)=>{
    res.render('products/new');
})

app.get('/products/:id' , async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show' , {product});

})

app.post('/products' , async (req,res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`);
})

// edit product 
app.get('/products/:id/edit' , async(req,res)=> {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{product});
})

app.put('/products/:id/edit',async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id , req.body , {runValidators:true,new:true});
    res.redirect(`/products/${product._id}`);
})

// deleting product 


app.delete('/products/:id' , async(req,res)=>{
    const {id} = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})


app.listen(3000,()=>{
    console.log("App listening on port 3000!!!");
})