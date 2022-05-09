const express = require('express');
const app = express();
const shelterRouter = require('./routes/shelter');
const adminRouter = require('./routes/admin');


// app.use('/shelter',shelterRouter);
// app.use('/admin',adminRouter);

//using cookies

app.get('/name',(req,res)=>{
    res.cookie('name','nitish');
    res.send('Sent you a cookie');
})

app.listen(3000,(req,res)=>{
    console.log('APp running on port 3000');
})