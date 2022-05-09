const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("shelters for the animals");
})

router.get('/:id',(req,res)=>{
    res.send("Editing one shelter");
})