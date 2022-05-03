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
    throw console.error("NOt found");
})


// this will run if not route if found , used for 404 error 
// this comes at very end of file
app.use((req,res)=>{
    res.status(404).send("NOt Found")
})

//error handling has 4 paramters in this middelware
// this is custom defined error 
app.use((err,req,res,next)=>{
    console.log('******ERROR******');

    //if we want to use built in error handler we pass err in next()
    next(err);
})

app.listen(3000,()=>{
    console.log("App running on port 3000");
})