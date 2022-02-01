// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({



    category: {
        type: String,
        required: true


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

const Category = mongoose.model('CATEGORIES', categorySchema);
module.exports = Category;




