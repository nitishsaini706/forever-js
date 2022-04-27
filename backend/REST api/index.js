const express = require('express');
const app = express();
const path = require('path');

const comments = [

    {
        username: ' todd',
        comment: 'this is load'
    },
    {
        username : 'khota',
        comment : 'this is khota'
    },
    {
        username : 'udem',
        comment : ' no electricity , sucks'
    }
]


//to accept form data from url 
app.use(express.urlencoded({extended:true}));

// to accept form data in json format from server
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/comments' , (req,res) => 
{
    res.render('comments/index' , {comments});
})

// create new comment 
app.get('/comments/new' ,(req,res)=> {
    res.render('comments/new');
})

//usig post method 
app.post('/comments' , (req,res)=>{
    const { username, comment } = req.body;
    comments.push({ username, comment});
    res.redirect("/comments");
})
app.listen(3000, (req, res) => {
    console.log('liestening');
})

