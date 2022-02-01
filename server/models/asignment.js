// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const { ObjectId } = mongoose.Schema.Types
const asignmentSchema = new mongoose.Schema({



    email: {
        type: String,
        required: true


    },

    title: {
        type: String,
        required: true


    },
    type: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true

    },
    deadline: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true

    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

    postedBy: {
        type: ObjectId
    },
    payment: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    solution: {
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


})


const Asignment = mongoose.model('ASIGNMENT', asignmentSchema);
module.exports = Asignment;




