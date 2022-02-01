
const express=require('express');
const authenticate =require('../middleware/authenticate')
const router=express.Router();
const multer=require('multer')
require('../db/dbconn');

const Ans=require("../models/ansSchema");
// storege routes
const storage =multer.diskStorage({
    destination:(req,res,callback)=>{
        callback(null,"./Client/public/uploads");
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})
const uplaod=multer({storage:storage})
router.post('/answer',authenticate,uplaod.single("articleImage") ,(req,res)=>{
    const newAns=new Ans({
        question:req.body.question,
        answer:req.body.answer,
        subject:req.body.subject,
        name:req.body.name,
        articleImage:req.file.originalname,
        queimg:req.body.queimg,
        postedBy:req.rootUser  
    });
    newAns.save().then(()=>res.json("Your Answer Posted For Asked Question"))
    .catch((err)=>{res.status(400).json({err:"server error"})})
})
// get data

router.get('/getanswer',(req,res)=>{
    
    Ans.find().sort({
        date:-1
    })
    .then(result=>{ 
   
    res.send(result.length>0?result:'No Answers'); 
    }) 
    .catch(err=>{ 
    console.log(err); 
    }) 
})
// 
// router.route('/:id').get((req, res) => {
    router.get('/viewanswer/:id',(req,res)=>{
    Ans.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));
  });
// search api
router.get('/searchanswer/:question',function(req,res){
    const regex=new RegExp(req.params.question,'i');
    Ans.find({question:regex}).sort({
        date:-1
    }).then((result)=>{
        res.status(200).json(result)
    })

})
// search by subject

// filter ans
router.get('/filteranswer/:subject',function(req,res){
    const regex=new RegExp(req.params.subject,'i');
    Ans.find({subject:regex}).sort({
        date:-1
    }).then((result)=>{
        res.status(200).json(result)
    })

})
//   likes
router.put('/likeans',authenticate,(req,res)=>{
    Ans.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.userId}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
// ulike Post
router.put('/unlikeans',authenticate,(req,res)=>{
    Ans.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.userId}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.get('/myans',authenticate,(req,res)=>{
    
    Ans.find({postedBy:req.rootUser}).sort({
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
router.delete('/deleteans/:id',(req,res)=>{
    Ans.findByIdAndDelete(req.params.id)
    .then(()=>res.json("The answer has been deleted")).catch(err=>res.status(400).json(`error:${err}`));
  });

 module.exports = router;