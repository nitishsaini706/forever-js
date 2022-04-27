const express = require('express');
const app = express();
const path = require('path');
var methodOverride = require('method-override')
const { v4: uuid } = require('uuid');
uuid();
app.use(methodOverride('_method'))


const comments = [

    {
        id:uuid(),
        username: ' todd',
        comment: 'this is load'
    },
    {
        id:uuid(),
        username : 'khota',
        comment : 'this is khota'
    },
    {
        id:uuid(),
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
    const { urn, cmt ,id } = req.body;
    comments.push({ urn, cmt , id:uuid()});
    res.redirect("/comments");
})

// getting comment from id 
app.get('/comments/:id' , (req,res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show' , {comment});
})

//editing comment 
///we cannot use patch normally through http method using form 
// so we use express override method , it trick browser in beliveing we are sending 
// get or post requerst but in real we're sending patch

app.patch('/comments/:id' , (req,res)=>{
    const {id} = req.params;
    const newComment = req.body.edit;
    const foundComment = comments.find( c => c.id === id);
    foundComment.comment = newComment;
    res.redirect('/comments');
})

app.get("/comments/:id/edit" , (req,res)=>{
    const {id} = req.params
    const cmt = comments.find(c => c.id === id);
    res.render('comments/edit' , {cmt});
})



app.listen(3000, (req, res) => {
    console.log('listening');
})

