// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const oneononeSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    curency:{
        type:String,
        required:true
    },

    title: {
        type: String,
        required: true


    },
    price: {
        type: String,
        required: true


    },

    desc: {
        type: String,
        required: true


    },
    image: {
        type: String
       
    },
    duration: {
        type: String,
        required: true

    },
    
    date: {
        type: String,
       required:true
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
tutor:{
    type:String
},

meetinglink:{
    type:String,
}

})
// userSchema.pre('save',function (next) {
//      if(this.i){

//      }
// })

const OneonOne = mongoose.model('SESSION', oneononeSchema);
module.exports = OneonOne;




