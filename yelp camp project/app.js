const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const campground = require('./model/campground');



main().catch(err => {console.log(err)})
async function main() {
    await mongoose.connect('mongodb://localhost:27017/camp',{
        useNewUrlParser : true,
        // useCreateIndex : true,
        UseUnifiedTopology : true
    });
    console.log('db working');
}



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/campground', async(req,res)=>{
    const camp =  await campground.find({});
    res.render('campground/index',{camp});
})

app.get('/camground/new' , (req,res)=>{
    res.render('campground/new');
})

app.get('/campground/:id' , async(req,res)=>{
    const {id} = req.params;
    const camp = await campground.findOne({id});
    res.render('campground/show',{camp});
})

app.post('/campground' , async(req,res)=>{
    
    const Campground = new campground(req.body.campground);
    await Campground.save();
    res.redirect(`/campground`);
})

app.listen(3000,()=>{
    console.log("server running on port 3000");
})