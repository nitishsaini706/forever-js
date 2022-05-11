const express = require('express');
const app = express();
const path = require('path')
const User = require('./model/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { mainModule } = require('process');

main().catch(e => console.log(e));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/auth');
}


app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("working");
})

app.get('/register',(req,res)=>{
    res.render("register");
    // res.send("register");
})

app.post('/register', async (req,res)=>{
    const {username , password } = req.body;
    const hash  = await bcrypt.hash(password , 12);
    const user = new User({username :username , password:hash});
    await user.save();

    res.redirect('/');
})

app.listen(3000,()=>{
    console.log("App listening on port 3000");
})