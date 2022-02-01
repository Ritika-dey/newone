
const express=require('express');
const bcrypt=require('bcryptjs')
const router=express.Router();
const jwt=require('jsonwebtoken')
require('../db/dbconn');
const authenticate=require('../middleware/authenticate')
const User=require("../models/userSchema")
router.get('/',(req,res)=>{
res.send ("hello from sidharth from auth.js")
})

router.post('/signup',(req,res)=>{
    var{name,email,phone,password,dob,profession , specialization,university }=req.body
    console.log(req.body)
    if(!name  || ! email || !phone || !password || !dob || !profession || !specialization || !university )
    {
        return res.status(200).json({error:"Add all data"})
    }else{
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
             university,
             
           
         })
         user.save()
         .then((user)=>{
             res.json({message:"Saved Successfully"})
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
    }
});
router.post('/signin',async(req , res)=>{
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
    
            // get
         
// profile
router.get('/about',authenticate,(req,res)=>{
  
   res.send(req.rootUser)
    });
    // get users route
    router.get('/getusers',(req,res)=>{
    
        User.find().sort({
            name:-1,
           
        })
        .then(result=>{ 
        console.log('result: ',result) 
        res.send(result.length>0?result:'No users'); 
        }) 
        .catch(err=>{ 
        console.log(err); 
        }) 
    })
    // limit users
    router.get('/getuser',(req,res)=>{
    
        User.find().sort({
            name:-1,
           
        }).limit(5)
        .then(result=>{ 
        console.log('result: ',result) 
        res.send(result.length>0?result:'No users'); 
        }) 
        .catch(err=>{ 
        console.log(err); 
        }) 
    })
    // logout routes
    router.get('/logout',(req,res)=>{
        
        res.clearCookie('jwtoken',{path:"/"});
        res.status(200).send('user logout')
         });


        //  update profile
        router.put("/updateprofile/:id",(req,res)=>{
            User.findById(req.params.id).then((article)=>{
                
                article.solution=req.file.originalname;
                 article.save().then(()=>res.json("Solution Added")).
                 catch((err)=>res.status(400).json(`${err}`));
        
            })
        })
        router.put("/updateuserdetails/:id",(req, res)=>{
            User.findById(req.params.id).then((article)=>{
                article.name=req.body.name;
                article.email=req.body.email;
                article.phone=req.body.phone;
                article.university=req.body.university;
                article.specialization=req.body.specialization;
                article.profession=req.body.profession;
                article.dob=req.body.dob;
                article.save().then(()=>res.json("Profile Updated")).
                catch((err)=>res.status(400).json(`${err}`));
            })
        })
 module.exports = router;