// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const examSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    remarks:{
          type:String,
          required:true
    },
    curency:{
       type:String,
    },
    subject:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
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
    price:{
        type:String,
    },
    payment:{
        type:String
    },
    solution:{
        type:String,
        required:true,
    },
    question:{
        type:String
    }
    
   
   

})
// userSchema.pre('save',function (next) {
//      if(this.i){

//      }
// })

const exam = mongoose.model('EXAM',examSchema);
module.exports = exam;




