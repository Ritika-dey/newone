
const express=require('express');
const authenticate =require('../middleware/authenticate')

const router=express.Router();

require('../db/dbconn');

const Notification = require('../models/notificationSchema');
// storege routes

// upload blogs
router.post('/addnot',(req,res)=>{
    const newnotification=new Notification({
       postedto:req.body.postedto,
        title:req.body.title,
        body:req.body.body,
        read:"Pending",
       
      
        
      
    });
    newnotification.save().then(()=>res.json("notification posted"))
    .catch((error)=>{res.status(400).json({error:"server error"})})
})
// // get review data

router.get('/getnot', (req, res) => {
    const regex = new RegExp('Pending', 'i');
    Notification.find({ read: regex }).sort({
        date: -1,
    }).then((result) => {
        res.status(200).json(result)
    })

});
router.get('/viewnot/:id',(req,res)=>{
    Notification.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.put("/updatenot/:id", (req, res) => {
    Notification.findById(req.params.id).then((article) => {

        article.read = 'Done';

        article.save().then(() => res.json("status ")).
            catch((err) => res.status(400).json(`Error:${err}`));

    })
})

router.get('/getnoti',(req,res)=>{
    
    Notification.find().sort({
        date:-1
    })
    .then(result=>{ 
   
    res.send(result.length>0?result:'No Answers'); 
    }) 
    .catch(err=>{ 
    console.log(err); 
    }) 
})
 module.exports = router;