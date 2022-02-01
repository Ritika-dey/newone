// const bcrypt = require('bcryptjs');
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const tutorSchema=new mongoose.Schema({
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

tutorSchema.methods.generateAuthToken= async function(){
    try {
        let token =jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(err)
    }
}
const Tutor=mongoose.model('TUTOR',tutorSchema);
module.exports=Tutor;




