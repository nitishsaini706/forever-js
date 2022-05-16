const express = require('express');
const router = express.Router({mergeParams:true});
const {isLogged} = require('../middleware');
const handleAsync = require('../utils/handleAsync');
const AppError = require('../utils/AppError');
const joi = require('joi');
const {campSchema } = require('../schema/camp');
const campground = require('../model/campground');
const flash = require('flash');
const { authorize } = require('passport/lib');


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
router.get('/', handleAsync(async(req,res)=>{
    const camp =  await campground.find({});
    res.render('campground/index',{camp});
}))

router.get('/new' , isLogged,(req,res)=>{
    res.render('campground/new');
})

router.get('/:id' ,handleAsync(async(req,res)=>{
    const {id} = req.params;
    const camp = await campground.findById(id).populate('reviews').populate('author');
    // console.log(camp.author)
    if(!camp){
        req.flash('error','Campground not present');
        return res.redirect('/campground');
    }
    

        res.render('campground/show',{camp});
    
}))

router.post('/' , schema ,isLogged,handleAsync(async(req,res)=>{
    
    // const user = req.session.user_id;
    const Campground = new campground(req.body.campground);
    Campground.author = req.user._id;
    // await author.save();
    await Campground.save();
    req.flash( 'success' , 'successfully created campground');
    res.redirect(`/campground/${Campground.id}`);
}))

router.get('/:id/edit',isLogged,handleAsync(async (req,res)=>{
    const {id} = req.params;
    const camp = await campground.findById(id);
    req.flash('success','Successfully edited the campground');
    res.render('campground/edit' ,{camp});
}))

router.put('/:id',schema,isLogged ,handleAsync(async(req,res)=>{
    const {id} = req.params;
    
    await campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/campground`);
}))

router.delete('/:id' ,isLogged, handleAsync(async(req,res)=>{
    const {id} = req.params;
    await campground.findByIdAndDelete(id);
    req.flash('success','Successfully deleted the campground');
    res.redirect('/campground');
}))



module.exports = router ;