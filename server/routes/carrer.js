
const express=require('express');

const router=express.Router();

require('../db/dbconn');

const Carrer = require('../models/carrerSchema');

// upload blogs
router.post('/carrer',(req,res)=>{
    const carrer=new Carrer({
        name:req.body.name,
        body:req.body.body,
        type:req.body.type,
        location:req.body.location,
        experience:req.body.experience,
        
    });
    carrer.save().then(()=>res.json("Carrer posted"))
    .catch((error)=>{res.status(400).json({error:"server error"})})
    // const carrer=Carrer(req.body)
    // carrer.save()
    // console.log(req.body)
    // res.send("submitted")
})
// get oneonone data

// fetch blogs.sort(mysort)
router.get('/getcarrer',(req,res)=>{
    
    Carrer.find().sort({
        experience:-1,
       
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