
const express=require('express');
const authenticate =require('../middleware/authenticate')
const router=express.Router();
const multer=require('multer')
require('../db/dbconn');

const Exam = require('../models/examSchema');
// storege routes
const storage =multer.diskStorage({
    destination:(req,res,callback)=>{
        callback(null,"./Client/public/Exam");
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})
const uplaod=multer({storage:storage})
// upload blogs
router.post('/exam',authenticate,uplaod.single("image"),(req,res)=>{
    const exam=new Exam({
       
        email:req.body.email,
        subject:req.body.subject,
        topic:req.body.topic,
        status:'Pending',
        date:req.body.date,
        image:req.file.originalname ,
        postedBy:req.rootUser,
        payment:"Pending",
        price:req.body.price,
        solution:"Pending",
        question:"Pending",
        remarks:"Pending",
        curency:"Pending",
        
    });
    exam.save().then(()=>res.json("Exam prepration posted"))
    .catch((error)=>{res.status(400).json({error:"server error"})})
    // const coursehelp=Coursehelp(req.body) ,uplaod.single("image") image:req.file.originalname 
    // coursehelp.save()
    // console.log(req.body)
    // res.send("submitted")
})
// get oneonone data

// fetch blogs.sort(mysort)
router.get('/getexam',(req,res)=>{
    
    Exam.find().sort({
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
router.put("/upe/:id",(req,res)=>{
    Exam.findById(req.params.id).then((article)=>{
       
        article.status='Completed';
    
         article.save().then(()=>res.json("status Updated to completed")).
         catch((err)=>res.status(400).json(`Error:${err}`));

    })
})
router.put("/uepe/:id",(req,res)=>{
    Exam.findById(req.params.id).then((article)=>{
       
        article.status='Pending';
    
         article.save().then(()=>res.json("status Updated to pending")).
         catch((err)=>res.status(400).json(`Error:${err}`));

    })
})
router.get('/myexam',authenticate,(req,res)=>{
    
    Exam.find({postedBy:req.rootUser}).sort({
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
    router.put("/payexam/:id",(req,res)=>{
        Exam.findById(req.params.id).then((article)=>{
            
            article.payment="Completed";
         
        
             article.save().then(()=>res.json("Thankyou")).
             catch((err)=>res.status(400).json(`Error:${err}`));
    
        })
    })
   
    router.put("/ueque/:id",uplaod.single("question"),(req,res)=>{
        Exam.findById(req.params.id).then((article)=>{
           article.price=req.body.price;
            article.question=req.file.originalname;
            article.curency=req.body.curency;
            article.remarks=req.body.remarks;
             article.save().then(()=>res.json("Exam File Added")).
             catch((err)=>res.status(400).json(`${err}`));
    
        })
    })
    router.put("/uesol/:id",uplaod.single("solution"),(req,res)=>{
        Exam.findById(req.params.id).then((article)=>{
          
            article.solution=req.file.originalname;
           
             article.save().then(()=>res.json("Exam File Added")).
             catch((err)=>res.status(400).json(`${err}`));
    
        })
    })
    router.delete('/deletee/:id',(req,res)=>{
        Exam.findByIdAndDelete(req.params.id)
        .then(()=>res.json("the article deleted")).catch(err=>res.status(400).json(`error:${err}`));
      });
      router.get('/searche/:topic',function(req,res){
        const regex=new RegExp(req.params.topic,'i');
        Exam.find({topic:regex}).sort({
            date:-1,
        }).then((result)=>{
            res.status(200).json(result)
        })
    
    })
    router.get('/getex',authenticate, (req, res) => {
        const regex = new RegExp('Pending', 'i');
        Exam.find({payment:regex,postedBy:req.rootUser }).sort({
            date: -1,
        }).then((result) => {
            res.status(200).json(result)
        })
    
    });
 module.exports = router;