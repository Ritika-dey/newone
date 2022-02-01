const dotenv=require('dotenv')
const express=require('express');
const authenticate =require('../middleware/authenticate')
const router=express.Router();
const multer=require('multer');
dotenv.config({path:'../config.env'});
const Paypal=process.env.Paypal_Client_Id
require('../db/dbconn');

const Asignment=require("../models/asignment");
// storege routes
const storage =multer.diskStorage({
    destination:(req,res,callback)=>{
        callback(null,"./Client/public/Assignments");
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})
const uplaod=multer({storage:storage})
// upload blogs
router.post('/addasignment',authenticate,uplaod.single("image"),(req,res)=>{
    const newasignment=new Asignment({
        title:req.body.title,
        email:req.body.email,
        desc:req.body.desc,
        type:req.body.type,
        deadline:req.body.deadline,
        status:"Pending",
        image:req.file.originalname,
        price:req.body.price,
        postedBy:req.rootUser,
        payment:"Pending",
        solution:"Pending",
        remarks:"Pending",
        curency:"Pending",
      

        
       
      
        
       
    });
    newasignment.save().then(()=>res.json("asignment help posted"))
    .catch((error)=>{res.status(400).json({error:"server error"})})
})



// fetch blogs.sort(mysort)

// fetch blogs.sort(mysort)
router.get('/getassignment',(req,res)=>{
    
    Asignment.find().sort({
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
// update status
router.put("/up/:id",(req,res)=>{
    Asignment.findById(req.params.id).then((article)=>{
       
        article.status='Completed';
    
         article.save().then(()=>res.json("Assignment Marked As Completed")).
         catch((err)=>res.status(400).json(`Error:${err}`));

    })
})
router.put("/upending/:id",(req,res)=>{
    Asignment.findById(req.params.id).then((article)=>{
       
        article.status='Pending';
    
         article.save().then(()=>res.json("Assignment Marked As  Pending")).
         catch((err)=>res.status(400).json(`Error:${err}`));

    })
})



router.get('/myassign',authenticate,(req,res)=>{
    
Asignment.find({postedBy:req.rootUser}).sort({
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
router.get('/pay' ,(req , res)=>{
res.send(Paypal)
})
router.get('/viewasign/:id',(req,res)=>{
    Asignment.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.put("/uppay/:id",(req,res)=>{
    Asignment.findById(req.params.id).then((article)=>{
        
        article.payment="Completed";
     
    
         article.save().then(()=>res.json("Thankyou")).
         catch((err)=>res.status(400).json(`Error:${err}`));

    })
})
  router.put("/updateassignment/:id",uplaod.single("solution"),(req,res)=>{
    Asignment.findById(req.params.id).then((article)=>{
        article.solution=req.file.originalname;
        article.remarks=req.body.remarks;
        article.curency=req.body.curency;
         article.save().then(()=>res.json("Solution Added")).
         catch((err)=>res.status(400).json(`${err}`));

    })
})
router.delete('/deleteasignment/:id',(req,res)=>{
    Asignment.findByIdAndDelete(req.params.id)
    .then(()=>res.json("the article deleted")).catch(err=>res.status(400).json(`error:${err}`));
  });
  
router.get('/searcha/:title',function(req,res){
    const regex=new RegExp(req.params.title,'i');
    Asignment.find({title:regex}).sort({
        date:-1,
    }).then((result)=>{
        res.status(200).json(result)
    })

})
// {postedBy:req.rootUser}
router.get('/getass',authenticate, (req, res) => {
    const regex = new RegExp('Pending', 'i');
    Asignment.find({payment:regex,postedBy:req.rootUser }).sort({
        date: -1,
    }).then((result) => {
        res.status(200).json(result)
    })

});
// router.get('/getass',authenticate,(req,res)=>{
    
//     Asignment.find({postedBy:req.rootUser , payment:Pending}).sort({
//             date:-1,
//         })
//         .then(result=>{ 
//         console.log('result: ',result) 
//         res.send(result.length>0?result:'No result'); 
//         }) 
//         .catch(err=>{ 
//         console.log(err); 
//         }) 
//     })
 module.exports = router;