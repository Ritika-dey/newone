
const express=require('express');
const authenticate =require('../middleware/authenticate')
const router=express.Router();
const multer=require('multer')
require('../db/dbconn');

const OneonOne = require('../models/oneononeSchema');
// storege routes
const storage =multer.diskStorage({
    destination:(req,res,callback)=>{
        callback(null,"./Client/public/Session");
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})
const uplaod=multer({storage:storage})
// upload blogs
router.post('/addsessions',authenticate,uplaod.single("image"),(req,res)=>{
    const newoneonone=new OneonOne({
        title:req.body.title,
        email:req.body.email,
        desc:req.body.desc,
        duration:req.body.duration,
        date:req.body.date,
        status:'Pending',
        price:req.body.price,
        curency:"Pending",
      
        
        image:req.file.originalname ,
        postedBy:req.rootUser,
        payment:"Pending",
        tutor:"Unknown",

        meetinglink:"unknown"
    });
    newoneonone.save().then(()=>res.json("Session request posted"))
    .catch((error)=>{res.status(400).json({error:"server error"})})
})
// get oneonone data

// fetch blogs.sort(mysort)
router.get('/getsessions',(req,res)=>{
    
    OneonOne.find().sort({
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
// update status
router.put("/ups/:id",(req,res)=>{
    OneonOne.findById(req.params.id).then((article)=>{
       
        article.status='Completed';
    
         article.save().then(()=>res.json("status Updated")).
         catch((err)=>res.status(400).json(`Error:${err}`));

    })
})
router.get('/mys',authenticate,(req,res)=>{
    
  OneonOne.find({postedBy:req.rootUser}).sort({
            date:-1,
        })
        .then(result=>{ 
        console.log('result: ',result) 
        res.send(result.length>0?result:'No result'); 
        }) 
        .catch(err=>{ 
        console.log(err); 
        }) 
    })
    router.put("/payone/:id",(req,res)=>{
        OneonOne.findById(req.params.id).then((article)=>{
            
            article.payment="Completed";
         
        
             article.save().then(()=>res.json("Thankyou For Confirmation")).
             catch((err)=>res.status(400).json(`Error:${err}`));
    
        })
    })
    router.put("/upsp/:id",(req,res)=>{
        OneonOne.findById(req.params.id).then((article)=>{
           
            article.status='Pending';
        
             article.save().then(()=>res.json("session Marked As  Pending")).
             catch((err)=>res.status(400).json(`Error:${err}`));
    
        })
    })
    router.put("/updatesessions/:id",(req,res)=>{
        OneonOne.findById(req.params.id).then((article)=>{
            
            article.price=req.body.price;
            article.tutor=req.body.tutor;
            article.curency=req.body.curency;
            article.meetinglink=req.body.meetinglink;
             article.save().then(()=>res.json("Solution Added")).
             catch((err)=>res.status(400).json(`${err}`));
    
        })
    })
    router.delete('/deletes/:id',(req,res)=>{
        OneonOne.findByIdAndDelete(req.params.id)
        .then(()=>res.json("the article deleted")).catch(err=>res.status(400).json(`error:${err}`));
      });
      router.get('/searchs/:title',function(req,res){
        const regex=new RegExp(req.params.title,'i');
        OneonOne.find({title:regex}).sort({
            date:-1,
        }).then((result)=>{
            res.status(200).json(result)
        })
    
    })
    router.get('/getone',authenticate, (req, res) => {
        const regex = new RegExp('Pending', 'i');
        OneonOne.find({payment:regex,postedBy:req.rootUser }).sort({
            date: -1,
        }).then((result) => {
            res.status(200).json(result)
        })
    
    });
 module.exports = router;