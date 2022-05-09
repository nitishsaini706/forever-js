const express = require('express');
const app = express();
const cookies = require('cookie-parser');
const shelterRouter = require('./routes/shelter');
const adminRouter = require('./routes/admin');


// app.use('/shelter',shelterRouter);
// app.use('/admin',adminRouter);
// app.use(cookies());
app.use(cookies('thisismysecret'));

//fetching cookies 
app.get('/greet',(req,res)=>{
    const {name} = req.cookies;
    res.send(`Hey there , ${name}`)
})

//signed cookies 
app.get('/verify',(req,res)=>{
    res.cookie('name','bhangu' ,{signed:true});
    res.send('signe cookie');
})

app.get('/verifiedname',(req,res)=>{
    // const {name} = req.signedCookies;
    res.send(req.signedCookies);
})

//creating cookies

app.get('/name',(req,res)=>{
    res.cookie('name','nitish');
    res.send('Sent you a cookie');
})

app.listen(3000,(req,res)=>{
    console.log('APp running on port 3000');
})