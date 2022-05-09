const express = require('express');
const router = express.Router();

// router.use((req,res,next)=>{
//     next();
// })

router.get('/',(req,res)=>{
    res.send("shelters for the animals");
})

router.get('/:id',(req,res,next)=>{
    res.send("Editing one shelter");
})

module.exports = router;