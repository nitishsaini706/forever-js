if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}


const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session')
const mongoose = require('mongoose');
const flash = require('flash');
const methodOverride = require('method-override');
const AppError = require('./utils/AppError');
const campRouter = require('./routes/campground');
const reviewRouter = require('./routes/review')
const userRouter = require('./routes/user');
const user = require('./model/user');
const passport = require('passport');
const localpass = require('passport-local');

main().catch(err => {console.log(err)})
async function main() {
    await mongoose.connect('mongodb://localhost:27017/camp',{
        useNewUrlParser : true,
        // useCreateIndex : true,
        UseUnifiedTopology : true
    });
    console.log('db working');
}


app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const sesscionConnfig = {
    secret: 'secret',
    resave:false,
    saveUninitialized:false,
    cookie : {
        httpOnly:true,
        expires : Date.now() + 1000*60*60*24*7 ,
        maxAge: 1000*60*60*24*7

    }
}

app.use(session(sesscionConnfig));
app.use(flash());

//passport will always be used after session
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localpass(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
    if(!['/login','/'].includes(req.originalUrl))
    {
        req.session.returnTo = req.originalUrl;
    }
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/logout' ,(req,res)=>{
    req.logout();
    req/flash("success","Goodbye");
    res.redirect('/campground');
})

app.use('/' , userRouter);
app.use('/campground' , campRouter);
app.use('/campground/:id/review' , reviewRouter);

app.all('*',(req,res,next)=>{
    next(new AppError('Page not found',404));
})

app.use((err,req,res,next)=>{
    const {message='Something went wrong' , status=500} = err;
    // res.status(status).send(message);
    //we are rendering error page instead of sending to browser
    res.status(status).render('error',{err});
})

app.listen(3000,()=>{
    console.log("server running on port 3000");
})