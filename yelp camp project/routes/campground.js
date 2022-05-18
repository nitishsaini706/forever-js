const express = require('express');
const router = express.Router({mergeParams:true});
const {isLogged,isAuthor,schema} = require('../middleware');
const handleAsync = require('../utils/handleAsync');
const campground = require('../controllers/campground');
const flash = require('flash');
const { authorize } = require('passport/lib');



router.get('/', handleAsync(campground.index))

router.get('/new' , isLogged,(req,res)=>{
    res.render('campground/new');
})

router.get('/:id' ,handleAsync(async(req,res)=>{
    const {id} = req.params;
    const camp = await campground.findById(id).populate(
        {path:'reviews',
        populate: {
            path:'author'
        }
    }).populate('author');
    // console.log(camp.author)
    if(!camp){
        req.flash('error','Campground not present');
        return res.redirect('/campground');
    }
    

        res.render('campground/show',{camp});
    
}))

router.post('/' , schema ,isAuthor,isLogged,handleAsync(async(req,res)=>{
    
    // const user = req.session.user_id;
    const Campground = new campground(req.body.campground);
    Campground.author = req.user._id;
    // await author.save();
    await Campground.save();
    req.flash( 'success' , 'successfully created campground');
    res.redirect(`/campground/${Campground.id}`);
}))

router.get('/:id/edit',isLogged,isAuthor,handleAsync(async (req,res)=>{
    const {id} = req.params;
    const camp = await campground.findById(id);
    req.flash('success','Successfully edited the campground');
    res.render('campground/edit' ,{camp});
}))

router.put('/:id',schema,isLogged ,isAuthor,handleAsync(async(req,res)=>{
    const {id} = req.params;
    
    await campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/campground`);
}))

router.delete('/:id' ,isLogged, isAuthor,handleAsync(async(req,res)=>{
    const {id} = req.params;
    await campground.findByIdAndDelete(id);
    req.flash('success','Successfully deleted the campground');
    res.redirect('/campground');
}))



module.exports = router ;