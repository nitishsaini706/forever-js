const express = require('express');
const app = express();
const morgan = require('morgan');
const appError = require('./AppError');


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

app.get('/admin' ,(req,res)=>{

    throw new appError('password required',401);

})

app.get('/dog',(req,res)=>{
    res.send("WOOF WOOF !!!!");
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

//we can also define errors like this

app.use((err,req,res,next)=>{
    // const {error = 500} = err.status;
    // const {message = "Something went wrong"} = err.message;

    const {error = 500 , message = "Something went wrond"} = err; //this is used to set default values
    res.status(error).send(message);
})

// 3. creating aysnc utility function to avoid writing try and catch all the time 
function handleAsync(fn){
    return function(req,res,next) {
        fn(req,res,next).catch(e => next(e));
    }
}
// handling async error 
// 4. we need to use utility function like this
app.get('/data', handleAsync(async(req,res,err)=>{

    const product = await Products.findById(id);
    if(!product)
    {
        // 1. to show error we need to use next as it will send the error to middleware 
        return next(new appError('not found',404));
    }
    //if return is not used this line will execute after showing error
    res.render('/products');
    // 2. we use try catch to get any mongoose error then we need throw instead of return and next , wich willl send error
}))

// we also use try and catch in asycn await

try{

}catch(e) {  
    // this will send error to our defined error code and will send error message to display it on browser
    next(e);
}


app.listen(3000,()=>{
    console.log("App running on port 3000");
})