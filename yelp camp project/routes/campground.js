const express = require('express');
const router = express.Router({mergeParams:true});
const {isLogged,isAuthor,schema} = require('../middleware');
const handleAsync = require('../utils/handleAsync');
const campground = require('../controllers/campground');
const flash = require('flash');
const { authorize } = require('passport/lib');
const multer  = require('multer')
const storage = require('../cloudnary/index')
const upload = multer(storage)


router.get('/', handleAsync(campground.index))

router.get('/new' ,isLogged,upload.array('image') ,campground.newRender);

router.get('/:id' ,handleAsync(campground.edit))

router.post('/' , schema ,isAuthor,isLogged,upload.array('image'),handleAsync(campground.create))

router.get('/:id/edit',isLogged,isAuthor,handleAsync(campground.editForm))

router.put('/:id',schema,isLogged ,isAuthor ,handleAsync(async(req,res)=>{
    const {id} = req.params;
    const img = req.files.map(f => ({url:f.url,filename:f.filename}));
    campground.images.push(...img);
    await campground.save();
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