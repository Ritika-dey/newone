
const express=require('express');

const router=express.Router();
const multer=require('multer')
require('../db/dbconn');
const authenticate =require('../middleware/authenticate')
const Blog=require("../models/blogSchema");
// storege routes
const storage =multer.diskStorage({
    destination:(req,res,callback)=>{
        callback(null,"./Client/public/Blogs");
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})
const uplaod=multer({storage:storage})
// upload blogs
router.post('/addblog',uplaod.single("articleImage"),(req,res)=>{
    const newblog=new Blog({
        title:req.body.title,
        name:req.body.name,
        body:req.body.body,
        subject:req.body.subject,
       
       
      
        
        articleImage:req.file.originalname
    });
    newblog.save().then(()=>res.json("Blog posted"))
    .catch((error)=>{res.status(400).json({error:"server error"})})
})
// get blogs data


// like post
router.put('/like',authenticate,(req,res)=>{
    Blog.findByIdAndUpdate(req.body.postId,{
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
router.put('/unlike',authenticate,(req,res)=>{
    Blog.findByIdAndUpdate(req.body.postId,{
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
// get blogs by id
router.get('/viewblog/:id',(req,res)=>{
    Blog.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));
  });
// fetch blogs.sort(mysort)
router.get('/getblogs',(req,res)=>{
    
    Blog.find().sort({
        date:-1,
       
    }).limit(4)
    .then(result=>{ 
    console.log('result: ',result) 
    res.send(result.length>0?result:'No Answers'); 
    }) 
    .catch(err=>{ 
    console.log(err); 
    }) 
})
// filter blog
router.get('/filterblogs/:subject',(req,res)=>{
    const regex=new RegExp(req.params.subject,'i');
    Blog.find({subject:regex}).then((result)=>{
        res.status(200).json(result)
    })

  });
// comments
router.put('/comments',authenticate,(req,res)=>{
    const comment = {
        text:req.body.text,
        name:req.body.name,
        postedBy:req.userId
    }
    Blog.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    
    .exec((error,result)=>{
        if(error){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

 module.exports = router;