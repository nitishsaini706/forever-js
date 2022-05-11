const express = require('express');
const app = express();
const path = require('path')
const User = require('./model/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const session = require('express-session');

main().catch(e => console.log(e));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/auth');
}


app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded({extended:true}));
app.use(session({secret:'secret'}));

const requireLogin = (req,res,next) => {
    if(!req.session.user_id)
    {
        return res.redirect('/login');
    }
    next();

}

app.get('/',(req,res)=>{
    res.send("working");
})


app.get('/register',(req,res)=>{
    res.render("register");
})

app.post('/register', async (req,res)=>{
    const {username , password } = req.body;
    const hash  = await bcrypt.hash(password , 12);
    const user = new User({username :username , password:hash});
    await user.save();
    req.session.user_id = user.id;
    res.redirect('/login');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.post('/login',async (req,res)=>{
    const {username , password} = req.body;
    const user = await User.findOne({username});
    // console.log(user);
    const pass = bcrypt.compare(password , user.password);
    if(pass)
    {
        req.session.user_id = user._id;
        res.redirect("/secret");
    }
    else{
        res.send("INvalid username or password");
    }

})

app.post('/logout' ,(req,res) =>{
    req.session.user_id = null;
    res.redirect('/login');
})

app.get('/secret',requireLogin,(req,res)=>{
    
    res.render('secret');
})

app.listen(3000,()=>{
    console.log("App listening on port 3000");
})