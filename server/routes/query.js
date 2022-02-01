
const express=require('express');

const router=express.Router();

require('../db/dbconn');

const Query = require('../models/querySchema');

// upload blogs
router.post('/query',(req,res)=>{
    const query=new Query({
        email:req.body.email,
        query:req.body.query, 
    });
    query.save().then(()=>res.json("Query posted"))
    .catch((error)=>{res.status(400).json({error:"server error"})})
    // const Query=Query(req.body)
    // Query.save()
    // console.log(req.body)
    // res.send("submitted")
})
// get oneonone data

// fetch blogs.sort(mysort)
router.get('/getquery',(req,res)=>{
    
    Query.find().sort({
        date:-1,
       
    })
    .then(result=>{ 
    console.log('result: ',result) 
    res.send(result.length>0?result:'No Answers'); 
    }) 
    .catch(err=>{ 
    console.log(err); 
    }) 
})

 module.exports = router;