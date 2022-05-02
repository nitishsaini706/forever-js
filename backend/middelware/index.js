const express = require('express');
const app = express();
const morgan = require('morgan');


app.listen(3000,()=>{
    console.log("App running on port 3000");
})