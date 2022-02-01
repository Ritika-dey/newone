
const express=require('express');
const authenticate =require('../middleware/authenticate')
const router=express.Router();
const multer=require('multer')
require('../db/dbconn');

const Note=require("../models/notesSchema");

// storege routes
const storage =multer.diskStorage({
    destination:(req,res,callback)=>{
        callback(null,"./Client/public/Uploads");
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})
const uplaod=multer({storage:storage})
router.post('/add',authenticate,uplaod.single("articleImage"),(req,res)=>{
    const newnote=new Note({
        question:req.body.question,
        subject:req.body.subject,
        name:req.body.name,
        articleImage:req.file.originalname,
        postedBy:req.rootUser,
    });
    newnote.save().then(()=>res.json("Question posted"))
    .catch((err)=>{res.status(400).json({err:"server error"})})
})
// get data

router.get('/get',(req,res)=>{
    
    Note.find().sort({
        date:-1,
    })
    .then(result=>{ 
    
    res.send(result.length>0?result:'No result'); 
    }) 
    .catch(err=>{ 
    console.log(err); 
    }) 
})
router.put("/update/:id",uplaod.single("articleImage"),(req,res)=>{
    Note.findById(req.params.id).then((article)=>{
        article.question=req.body.question;
        article.subject=req.body.subject;
        article.articleImage=req.file.originalname;
         article.save().then(()=>res.json("article Updated")).
         catch((err)=>res.status(400).json(`Error:${err}`));

    })
})
// delete
// router.delete('/delete/:id',(res,req)=>{
//     Note.findByIdAndDelete(req.params.id)
//     // .then(()=>res.json("the article in deleted")).catch(err=>res.status(400).json(`error:${err}`));
// })
router.delete('/delete/:id',(req,res)=>{
    Note.findByIdAndDelete(req.params.id)
    .then(()=>res.json("the article in deleted")).catch(err=>res.status(400).json(`error:${err}`));
  });
// 
// router.route('/:id').get((req, res) => {
    router.get('/view/:id',(req,res)=>{
    Note.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));
  });
// search api

router.get('/search/:question',function(req,res){
    const regex=new RegExp(req.params.question,'i');
    Note.find({question:regex}).sort({
        date:-1,
    }).then((result)=>{
        res.status(200).json(result)
    })

})

router.get('/filterque/:subject',(req,res)=>{
    const regex=new RegExp(req.params.subject,'i');
    Note.find({subject:regex}).sort({
        date:-1,
    }).then((result)=>{
        res.status(200).json(result)
    })

  });
//   likes
  router.put('/likeque',authenticate,(req,res)=>{
    Note.findByIdAndUpdate(req.body.postId,{
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
router.put('/unlikeque',authenticate,(req,res)=>{
    Note.findByIdAndUpdate(req.body.postId,{
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

router.get('/myque',authenticate,(req,res)=>{
    
    Note.find({postedBy:req.rootUser}).sort({
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
 module.exports = router;