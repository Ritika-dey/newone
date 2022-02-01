// const bcrypt = require('bcryptjs');
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true


    },
    email:{
        type:String,
        required:true


    },
    phone:{
        type:Number,
        required:true


    },
    password:{
        type:String,
        required:true


    },
   
    university:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true


    },
    profession:{
        type:String,
        required:true


    },
    specialization:{
        type:String,
        required:true


    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
         
            }
        }
    ]
    
  
})
// userSchema.pre('save',function (next) {
//      if(this.i){

//      }
// })

userSchema.methods.generateAuthToken= async function(){
    try {
        let token =jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}
const User=mongoose.model('USER',userSchema);
module.exports=User;




