const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({secret:'secret' , resave:false , saveUninitialized:false}));

// there is something called flash messages , checkout npm flash on web , im not using it in this session 
// we can store flash messages in req.locals instead of passing them in res.render();

app.get('/view',(req,res)=>{
    // we can use anything 
    if(req.session.count){
        req.session.count += 1;
    }
    else{
        req.session.count =1;
    }
    res.send(`You visited this page ${req.session.count} times`);
})

app.get('/register' , (req,res)=>{
    const {username = "Undefined"} = req.query;
    req.session.username = username;
    res.send(`sending username ${username}`)
})

app.get('/session' , (req,res)=>{
    const {username} = req.session;
    res.send(`Welcome ${username}`);
})

app.listen(3000,(req,res)=>{
    console.log('App running on port 3000');
})