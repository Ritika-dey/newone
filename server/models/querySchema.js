// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

const querySchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },

    query:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
   

})
// userSchema.pre('save',function (next) {
//      if(this.i){

//      }
// })

const query = mongoose.model('query',querySchema);
module.exports = query;




