const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override');
const farm = require('./models/farm');

const category = ['fruit','dairy' ,'vegetables']
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
 
//farms 

app.get('/farm',async (req,res)=>{
    const farms= await farm.find({})
    res.render('farms/index',{farms})
})



app.get('/farm/new' ,(req,res)=>{
    res.render('farms/new');
})

app.get('/farm/:id' , async(req,res)=>{
    const f = await farm.findById(req.params.id);
    res.render('farms/show',{f})
})
app.post('/farm' , async(req,res)=>{
    // res.send(req.body);
    const fa = new farm(req.body);
    await fa.save()
    res.redirect('/farm')
})


///products model
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

// attaching farms and product

app.get('/farm/:id/product/new' , (req,res)=>{
    const {id} = req.params;
    res.render('products/new' , {category , id})
})

app.post('/farm/:id/product' , async(req,res)=>{
    const {name , category,price} = req.body;
    const far = await farm.findById(req.params.id);
    const pro = new Product({name,category,price});
    far.product.push(pro);
    pro.farm = far;
    await pro.save();
    await far.save();
    res.send(far)
})

app.listen(3000,()=>{
    console.log("App listening on port 3000!!!");
})