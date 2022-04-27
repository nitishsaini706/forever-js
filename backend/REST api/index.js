const { urlencoded } = require('express');
const express = require('express');
const app = express();
const path = require('path');

//to accept form data from url 
app.use(express.urlencoded({ extended: true }))

// to accept form data in json format from server
app.use(express.json());

app.set('views', path.join(__dirname__, 'views'));
app.set('views engine', ejs);



app.listen(3000, (req, res) => {
    console.log('liestening');
})
