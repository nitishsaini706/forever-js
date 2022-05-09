const express = require('express');
const router = express.Router();

// if we want to use middleware for a paticular router , we can use router middleware ,
// instead of using app middleware which will display in every route and we dont want that 

router.use((req,res,next)=>{
    if(req.query.isAdmin)
    {
        res.send("access granted");
    }
    res.send("NOt admin , need admin access");
})

router.get('/',(req,res)=>{
    res.send("admin access granted");
})

router.get('/:id',(req,res)=>{
    res.send('Admin ACoount error');
})

module.exports = router;