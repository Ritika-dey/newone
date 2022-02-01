
const express=require('express');
const authenticate =require('../middleware/authenticate')
const router=express.Router();
const multer=require('multer')
require('../db/dbconn');

const Coursehelp = require('../models/corsehelp');
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
// upload blogs
router.post('/course',authenticate,uplaod.single("image"),(req,res)=>{
    const coursehelp=new Coursehelp({
        title:req.body.title,
        email:req.body.email,
        desc:req.body.desc,
        type:req.body.type,
        deadline:req.body.deadline,
        status:'Pending',
         image:req.file.originalname,
         postedBy:req.rootUser,
         payment:"Pending",
         price:req.body.price,
         solution:"Pending",
         curency:'pending',
 
    });
    coursehelp.save().then(()=>res.json("Course help posted"))
    .catch((error)=>{res.status(400).json({error:"server error"})})
    // const coursehelp=Coursehelp(req.body)
    // coursehelp.save()
    // console.log(req.body)
    // res.send("submitted")
})
// get oneonone data

// fetch blogs.sort(mysort)
router.get('/getcourse',(req,res)=>{
    
    Coursehelp.find().sort({
        deadline:-1,
       
    })
    .then(result=>{ 
    console.log('result: ',result) 
    res.send(result.length>0?result:'No Answers'); 
    }) 
    .catch(err=>{ 
    console.log(err); 
    }) 
})
router.put("/upc/:id",(req,res)=>{
    Coursehelp.findById(req.params.id).then((article)=>{
       
        article.status='Completed';
    
         article.save().then(()=>res.json("Status Marked As Updated, ")).
         catch((err)=>res.status(400).json(`Error:${err}`));

    })
})
router.put("/upcc/:id",(req,res)=>{
    Coursehelp.findById(req.params.id).then((article)=>{
       
        article.status='Pending';
    
         article.save().then(()=>res.json("Status Marked As  Pending")).
         catch((err)=>res.status(400).json(`Error:${err}`));

    })
})
router.get('/mychelp',authenticate,(req,res)=>{
    
    Coursehelp.find({postedBy:req.rootUser}).sort({
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
    router.put("/upchelp/:id",(req,res)=>{
        Coursehelp.findById(req.params.id).then((article)=>{
            
            article.payment="Completed";
         
        
             article.save().then(()=>res.json("Thankyou For Confirmation")).
             catch((err)=>res.status(400).json(`Error:${err}`));
    
        })
    })
    router.put("/ucsol/:id",uplaod.single("solution"),(req,res)=>{
        Coursehelp.findById(req.params.id).then((article)=>{
           article.price=req.body.price;
           article.curency=req.body.curency;
            article.solution=req.file.originalname;
             article.save().then(()=>res.json("Solution Added")).
             catch((err)=>res.status(400).json(`${err}`));
    
        })
    })
    router.delete('/deletec/:id',(req,res)=>{
        Coursehelp.findByIdAndDelete(req.params.id)
        .then(()=>res.json("the article  deleted")).catch(err=>res.status(400).json(`error:${err}`));
      });
      router.get('/searchc/:title',function(req,res){
        const regex=new RegExp(req.params.title,'i');
        Coursehelp.find({title:regex}).sort({
            date:-1,
        }).then((result)=>{
            res.status(200).json(result)
        })
    
    })
    router.get('/gethelps',authenticate, (req, res) => {
        const regex = new RegExp('Pending', 'i');
        Coursehelp.find({payment:regex,postedBy:req.rootUser }).sort({
            date: -1,
        }).then((result) => {
            res.status(200).json(result)
        })
    
    });
 module.exports = router;