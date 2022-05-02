const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));
//how to use middleware 
app.use((req,res,next)=>{
    console.log("MIddleware");
    next();
})

// we can also set middleware for a specific route
app.use('/dog',(req,res,next)=>{
    console.log("we are under dogs");
    next();
})

app.get('/',(req,res)=>{
    res.send('Home page');
})

app.get('/dog',(req,res)=>{
    res.send("WOOF WOOF !!!!");
})



app.listen(3000,()=>{
    console.log("App running on port 3000");
})