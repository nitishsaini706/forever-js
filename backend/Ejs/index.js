const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const reditData = require('./data.json');

// we can use partials and include files which are repeating 

app.set('view engine','ejs');

// this wont work if we are in diff director than views so for that we use path module 
app.set('views',path.join(__dirname,'/views'));

// we are templating here using render , it renders the page user requested for 
// basic template for a website 

app.get('/',(req,res) => {
    res.render('home.ejs');
})
//using loops in ejs 

app.get('/cats' , (req,res) => {
    const cats = ['harman' ,'shivansh' , 'vaidant' , 'piyush' , 'kp'];
    res.render('cats', {cats});
})

// to use js , css files we need to use static which rendersall files inside public folder
// to use it in all directoris we need to join path 
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'/public')));



app.get('/r/:subredit' , (req,res) => {
    const {subredit} = req.params;
    const data = reditData[subredit];
    if(data)
    {
        res.render('redit',{ ...data });
    }
    else{
        res.render('error',{subredit})
    }
})

app.listen(port , (req,res) => {
    console.log("lIstening");
})
