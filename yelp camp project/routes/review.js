const express = require('express');
const router = express.Router({mergeParams:true});

const handleAsync = require('../utils/handleAsync');
const AppError = require('../utils/AppError');
const joi = require('joi');
const {reviewSchema} = require('../schema/camp');
const campground = require('../model/campground');
const Review = require('../model/review');


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


router.post('/', handleAsync(async(req,res)=>{
    const camp = await campground.findById(req.params.id);
    const review = new Review(req.body.review);
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    req.flash('success','Created a review');
    res.redirect(`/campground/${camp.id}`)
}))

router.delete('/:reviewId' , handleAsync(async (req,res)=>{
    const {id , reviewId} = req.params;
    await campground.findByIdAndUpdate(id,{$pull : {$in : req.params.reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully deleted a review');
    res.redirect(`/campground/${camp.id}`);
}))

module.exports = router;