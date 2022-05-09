const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const handleAsync = require('./utils/handleAsync');
const AppError = require('./utils/AppError');
const joi = require('joi');
const {campSchema , reviewSchema} = require('./schema/camp');
const campground = require('./model/campground');
const Review = require('./model/review');


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

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.render('home');
})


// joi isused fo server side validation in js not db
// it do vslidatio nbefore storing data in db
const schema = (req,res,next)=>{
    const {error} = campSchema.validate(req.body);
    if(error) 
    {
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(msg,400);
    }
    else{
        next();
    }
}

const reviewValidation = (req,res,next) =>{
    const {error} = reviewSchema.validate(req.body);
    if(error) 
    {
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(msg,400);
    }
    else{
        next();
    }
}

app.get('/campground', handleAsync(async(req,res)=>{
    const camp =  await campground.find({});
    res.render('campground/index',{camp});
}))

app.get('/campground/new' , (req,res)=>{
    res.render('campground/new');
})

app.get('/campground/:id' ,handleAsync(async(req,res)=>{
    const {id} = req.params;
    const camp = await campground.findById(id).populate('reviews');

    res.render('campground/show',{camp});
}))

app.post('/campground' , schema ,handleAsync(async(req,res)=>{
    
    const Campground = new campground(req.body.campground);
    await Campground.save();
    res.redirect(`/campground`);
}))

app.get('/campground/:id/edit',handleAsync(async (req,res)=>{
    const {id} = req.params;
    const camp = await campground.findById(id);
    res.render('campground/edit' ,{camp});
}))

app.put('/campground/:id',schema ,handleAsync(async(req,res)=>{
    const {id} = req.params;
    
    await campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/campground`);
}))

app.post('/campground/:id/review', handleAsync(async(req,res)=>{
    const camp = await campground.findById(req.params.id);
    const review = new Review(req.body.review);
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    res.redirect(`/campground/${camp.id}`)
}))

app.delete('/campground/:id/review/:reviewId' , handleAsync(async (req,res)=>{
    const {id , reviewId} = req.params;

    await campground.findByIdAndUpdate(id,{$pull : {$in : req.params.reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campground/${camp.id}`);
}))


app.delete('/campground/:id' , handleAsync(async(req,res)=>{
    const {id} = req.params;
    await campground.findByIdAndDelete(id);
    res.redirect('/campground');
}))

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