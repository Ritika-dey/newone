// const bcrypt = require('bcryptjs');
const mongoose=require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const ansSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true


    },
    answer:{
        type:String,
        required:true


    },
   
    
    subject:{
        type:String,
        required:true


    },  
    
    question:{
        type:String,
        required:true


    },
    articleImage:{
        type:String
       
    },
    queimg:{
         type:String,
    },
   date: {
        type: Date,
        default: Date.now
    },
    likes: [{ type: ObjectId, ref: "User" }],
    postedBy: {
        type: ObjectId
    }
  
})
// userSchema.pre('save',function (next) {
//      if(this.i){

//      }
// })

const Answer = mongoose.model('ANSWER',ansSchema);
module.exports=Answer;




