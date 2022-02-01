
const express=require('express');

const router=express.Router();

require('../db/dbconn');

const Category=require("../models/categorySchema");
// storege routes


router.post('/category' ,(req,res)=>{
    const {category}=req.body
    if(!category){
        return res.status(422).json({error:"please add subject first"})
    }
    Category.findOne({category:category})
    .then((savedData)=>{
        if(savedData){
            return res.status(422).json({error:"Category Already Exists With This Name"})
        }
        const data=new Category({
            category:category
        })
        data.save()
        .then(()=>{
            res.json({message:"Category Added"})
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})
// get data

router.get('/getcategory',(req,res)=>{
    
    Category.find().sort({
        date:-1
    })
    .then(result=>{ 
   
    res.send(result.length>0?result:'No Categories'); 
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