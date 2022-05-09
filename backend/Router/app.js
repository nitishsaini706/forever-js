const express = require('express');
const app = express();
const cookies = require('cookie-parser');
const shelterRouter = require('./routes/shelter');
const adminRouter = require('./routes/admin');


// app.use('/shelter',shelterRouter);
// app.use('/admin',adminRouter);
app.use(cookies());

//fetching cookies 
app.get('/greet',(req,res)=>{
    const {name} = req.cookies;
    res.send(`Hey there , ${name}`)
})
//creating cookies

app.get('/name',(req,res)=>{
    res.cookie('name','nitish');
    res.send('Sent you a cookie');
})

app.listen(3000,(req,res)=>{
    console.log('APp running on port 3000');
})