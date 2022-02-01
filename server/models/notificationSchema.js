// const bcrypt = require('bcryptjs');
const mongoose=require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const notificationSchema=new mongoose.Schema({
    postedto:{
        type: ObjectId


    },
    read:{
     type:String,
    },
   title:{
        type:String,
        required:true


    },
   
    
    body:{
        type:String,
        required:true


    },  
    date: {
        type: Date,
        default: Date.now
    },
   
  
})
// userSchema.pre('save',function (next) {
//      if(this.i){

//      }
// })

const Notification = mongoose.model('NOTIFICATION',notificationSchema);
module.exports=Notification;




