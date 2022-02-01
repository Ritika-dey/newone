// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const blogsSchema = new mongoose.Schema({



    title: {
        type: String,
        required: true


    },

    body: {
        type: String,
        required: true


    },
    articleImage: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true

    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{
        text: String,
        postedBy: { type: ObjectId, ref: "User" }
    }],
   

})
// userSchema.pre('save',function (next) {
//      if(this.i){

//      }
// })

const Blog = mongoose.model('BLOG', blogsSchema);
module.exports = Blog;




