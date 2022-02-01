
const express=require('express');

const router=express.Router();
const multer=require('multer')
require('../db/dbconn');

const Query = require('../models/ask_tutorSchema');
// storege routes
// storege routes
const storage =multer.diskStorage({
    destination:(req,res,callback)=>{
        callback(null,"./Client/public/Course");
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})
const uplaod=multer({storage:storage})

router.post('/addquery',uplaod.single("image"),(req,res)=>{
    const query=new Query({
        email:req.body.email,
        query:req.body.query,
        subject:req.body.subject,
        image:req.file.originalname
        
    });
    query.save()
    .then(()=>res.json({message :"Query posted"}))
    .catch((error)=>{res.status(400).json({error:"server error"})})
    // const Query=Query(req.body)
    // Query.save()
    // console.log(req.body)
    // res.send("submitted")
})
// get oneonone data

// fetch blogs.sort(mysort)
router.get('/gettutorquery',(req,res)=>{
    
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