const express = require('express');
const app = express();
const port = '3000';



// : by adding : we can access params of url
app.get('/r/:name', (req,res) => {
     const {name} = req.params;
     res.send(`<h1>How to add params ${name} from url to response from server</h1>`);
})


app.get('*',(req,res) => {
    res.send('<h1>Express js working<h1>');
})


app.listen(port , (req , res) => {
    console.log("listening")
})