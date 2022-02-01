
const express=require('express');
const bcrypt=require('bcryptjs')
const router=express.Router();
const jwt=require('jsonwebtoken')
require('../db/dbconn');
const authenticate=require('../middleware/tutorauth')
const User=require("../models/tutorSchema")
router.get('/',(req,res)=>{
res.send ("hello from sidharth from auth.js")
})

router.post('/tutorsignup',(req,res)=>{
    var{name,email,phone,password,dob,profession , specialization}=req.body
    console.log(req.body)
    if(!name  || ! email || !phone || !password || !dob || !profession || !specialization )
    {
        return res.status(200).json({error:"Add all data"})
    }
    bcrypt.hash(password,12)
    .then((hashedpw)=>{
        User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                 return res.status(422).json({error:"User already exists with that email"})
            }
            const user=new User({
             email,
             password:hashedpw,
             name,
             phone,
             dob,
             profession,
             specialization,
           
         })
         user.save()
         .then((user)=>{
             res.json({message:"Saved Successfully"})
             console.log(user.email)
         })
         .catch((err)=>{
             console.log(err)
         })
    })
    .catch((err)=>{
        console.log(err)
    })   

})
.catch((err)=>{
    console.log(err)
})
});
router.post('/tutorsignin',async(req , res)=>{
    // console.log(req.body);
    // res.json({message:"welcome"});
    try{
        let token;
        const {email,password}=req.body;
        if( !email || !password){
            res.status(400).json({error:"please enter your credentials"})
        }
        const userLogin= await User.findOne({email:email});
        if(userLogin){
            const isMatch =await bcrypt.compare(password,userLogin.password)
               token= await userLogin.generateAuthToken();
              console.log(token)
              res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                  httpOnly:true
              })
            if(!isMatch){
                res.status(402).json({error:"Invalid credentials password"})
            }else{
                res.json({message:"user signed in"})
            }
        }else{
            res.status(402).json({error:"Invalid credentials"})
        }
        
        
    
    }catch(err){
        console.log(err);
    }
            });
    
// profile
// profile
router.get('/abouttutor',authenticate,(req,res)=>{
  
    res.send(req.rootUser)
     });
    // logout routes
    router.get('/tutorlogout',(req,res)=>{
        
        res.clearCookie('jwtoken',{path:"/"});
        res.status(200).send('user logout')
         });
 module.exports = router;