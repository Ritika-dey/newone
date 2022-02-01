// const bcrypt = require('bcryptjs');
const mongoose=require('mongoose')

const carrerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true


    },
    body:{
        type:String,
        required:true


    },
   
    
    type:{
        type:String,
        required:true


    },  
    
    location:{
        type:String,
        required:true


    },
   
   experience: {
        type: String,
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

const Carrer = mongoose.model('CARRER',carrerSchema);
module.exports=Carrer;




