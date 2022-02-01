// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({



    name: {
        type: String,
        required: true


    },

    university: {
        type: String,
        required: true


    },
    review: {
        type: String,
        required: true
    },
    status:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    rating:{
        type:String,
        required:true
    }
   

})
// userSchema.pre('save',function (next) {
//      if(this.i){

//      }
// })

const Review = mongoose.model('REVIEW', reviewSchema);
module.exports = Review;




