const campground = require('../model/campground');

module.exports.index = async(req,res)=>{
    const camp =  await campground.find({});
    res.render('campground/index',{camp});
}
