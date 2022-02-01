// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

const ask_tutorSchema = new mongoose.Schema({

   
   email:{
       type:String,
       required:true
   },
    query:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    subject:{
        type:String,
        required:true
    },
    image:{
        type:String
       
    },
})
// userSchema.pre('save',function (next) {
//      if(this.i){

//      }
// })

const ask_tutor = mongoose.model('TUTORQUERIES',ask_tutorSchema);
module.exports = ask_tutor;




