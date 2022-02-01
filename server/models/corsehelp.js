// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const coursehelpSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
       curency:{
          type:String
       },
    title: {
        type: String,
        required: true


    },
    price:{
     type:String,
    },
    solution:{
        type:String,
       },
     type:{
      type:String,
      required:true
     },
    desc: {
        type: String,
        required: true


    },
    
    deadline: {
        type: String,
        required: true

    },
    image:{
        type:String
        
    },
    status:{
        type:String,
        
    },
    postedBy: {
        type: ObjectId
    },
    payment:{
        type:String
    },
    
    Date: {
        type: Date,
        default: Date.now
    },
   
   

})
// userSchema.pre('save',function (next) {
//      if(this.i){

//      }
// })

const Coursehelp = mongoose.model('COURSEHELP',coursehelpSchema);
module.exports = Coursehelp;




