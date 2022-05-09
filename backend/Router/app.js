const express = require('express');
const app = express();
const router = require('./routes/shelter');


app.use('/shelter',router);

app.listen(3000,(req,res)=>{
    console.log('APp running on port 3000');
})