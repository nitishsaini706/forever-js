const AppError = require('./utils/AppError');
const campground = require('./model/campground');
const review  = require('./model/review');
const joi = require('joi');
const {campSchema } = require('./schema/camp');


module.exports.isLogged = (req,res,next) =>{

    if(!req.isAuthenticated())
    {
        req.flash('error' , "Need to login");
        res.redirect('/login');
    }
    next();
}

// joi isused fo server side validation in js not db
// it do vslidatio nbefore storing data in db
module.exports.schema = (req,res,next)=>{
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

module.exports.isAuthor = async(req,res,next) =>{
    const {id} = req.params;
    const camp = await campground.findById(id);
    if(!camp.author.equals(req.user))
    {
        res.flash('error','NOT authorized');
        res.redirect(`/campground/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req,res,next) =>{
    const {reviewid} = req.params;
    const camp = await review.findById(reviewid);
    if(!camp.author.equals(req.user))
    {
        res.flash('error','NOT authorized');
        res.redirect(`/campground/${id}`);
    }
    next();
}
