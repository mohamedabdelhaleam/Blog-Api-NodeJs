const mongoose = require("mongoose")
const validator = require("validator")

const userschema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate :[validator.isEmail,"failed must be valid email address"]
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('User',userschema)