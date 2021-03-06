const express = require('express');
const router = express.Router();
const Passport = require('passport');
const User = require('../model/user');

router.get('/register' ,(req,res)=>{

    res.render('user/register');
})

router.post('/register' , async(req,res,next) =>{
    try{
        const {username , email ,password} = req.body;
        const user = new User({username , email});
        const registered = await User.register(user,password);
        req.login(registered,err => {
            if(err) 
            {
                return next(err);
            }
            req.flash('success',"successfully registered");
            res.redirect('/campground');

        })
    }catch(e)
    {
        req.flash('error',e.message);
        res.redirect('/register');
    }
})

router.get('/login' , (req,res)=>{
    res.render('user/login');
})

router.post('/login' , Passport.authenticate('local', {failureFlash:true , failureRedirect:'/login'} ) ,(req,res) =>{
    req.flash('success',"Welcome back!!!!");

    const redirectUrl = req.session.returnTo || "/campground";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

module.exports = router;