const express = require('express');
const app = express();
const shelterRouter = require('./routes/shelter');
const adminRouter = require('./routes/admin');


app.use('/shelter',shelterRouter);
app.use('/admin',adminRouter);

app.listen(3000,(req,res)=>{
    console.log('APp running on port 3000');
})