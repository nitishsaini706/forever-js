const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

//setting mongoose 
main().catch(err => console.log(err));

async function main () {
  await mongoose.connect('mongodb://localhost:27017/movieApp');
  console.log('mongoose connected');
}

app.set('views',path.join(__dirname , 'views'));
app.set('view engine','ejs');


app.get('/dog',(req,res)=>{
    res.send("WOOF!!!");
})
app.listen(3000,()=>{
    console.log("App listening on port 3000!!!");
})