
const campground = require('../model/campground');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAP_TOKEN;

// this contains 2 methods forward and reverse geocode
const geocoding = mbxGeocoding({accessToken : mapBoxToken});


module.exports.index = async (req, res) => {
    const camp = await campground.find({});
    res.render('campground/index', { camp });
}


module.exports.newRender = (req, res) => {
    res.render('campground/new');
}

module.exports.edit= async (req, res) => {
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

    // res.send(req.params);
    res.render('campground/show', { camp });

}

module.exports.editForm = async (req,res)=>{
    const {id} = req.params;
    const camp = await campground.findById(id);
    req.flash('success','Successfully edited the campground');
    res.render('campground/edit' ,{camp});
}


module.exports.create = async(req,res)=>{
    
    // const user = req.session.user_id;

    const geodata = await geocoding.forwardGeocode({
        query:' Amritsar , India',
        limit:1
    }).send()
    

    const Campground = new campground(req.body.campground);
    campground.location = geodata.body.features[0].geometry;
    const images = req.files.map(f => ({url:f.url,filename:f.filename}));
    Campground.author = req.user._id;
    // await author.save();
    await Campground.save();
    req.flash( 'success' , 'successfully created campground');
    res.redirect(`/campground/${Campground.id}`);
}