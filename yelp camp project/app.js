const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./utils/AppError');
const campRouter = require('./routes/campground');
const reviewRouter = require('./routes/review')

main().catch(err => {console.log(err)})
async function main() {
    await mongoose.connect('mongodb://localhost:27017/camp',{
        useNewUrlParser : true,
        // useCreateIndex : true,
        UseUnifiedTopology : true
    });
    console.log('db working');
}


app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.render('home');
})


app.use('/campground' , campRouter);
app.use('/campground/:id/review' , reviewRouter);

app.all('*',(req,res,next)=>{
    next(new AppError('Page not found',404));
})

app.use((err,req,res,next)=>{
    const {message='Something went wrong' , status=500} = err;
    // res.status(status).send(message);
    //we are rendering error page instead of sending to browser
    res.status(status).render('error',{err});
})

app.listen(3000,()=>{
    console.log("server running on port 3000");
})