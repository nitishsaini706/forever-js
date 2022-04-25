const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine','ejs');

// this wont work if we are in diff director than views so for that we use path module 
app.set('views',path.join(__dirname,'/views'));

// we are templating here using render , it renders the page user requested for 
// basic template for a website 

app.get('/',(req,res) => {
    res.render('home.ejs');
})

app.listen(port , (req,res) => {
    console.log("lIstening");
})
