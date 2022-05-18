
const campground = require('../model/campground');

module.exports.index = async (req, res) => {
    const camp = await campground.find({});
    res.render('campground/index', { camp });
}


module.exports.newRender = (req, res) => {
    res.render('campground/new');
}

module.exports. edit= async (req, res) => {
    const { id } = req.params;
    const camp = await campground.findById(id).populate(
        {
            path: 'reviews',
            populate: {
                path: 'author'
            }
        }).populate('author');
    // console.log(camp.author)
    if (!camp) {
        req.flash('error', 'Campground not present');
        return res.redirect('/campground');
    }


    res.render('campground/show', { camp });

}


module.exports.create = async(req,res)=>{
    
    // const user = req.session.user_id;
    const Campground = new campground(req.body.campground);
    Campground.author = req.user._id;
    // await author.save();
    await Campground.save();
    req.flash( 'success' , 'successfully created campground');
    res.redirect(`/campground/${Campground.id}`);
}