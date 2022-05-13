module.exports.isLogged = (req,res,next) =>{

    if(!req.isAuthenticated())
    {
        req.flash('error' , "Need to login");
        res.redirect('/login');
    }
    next();
}