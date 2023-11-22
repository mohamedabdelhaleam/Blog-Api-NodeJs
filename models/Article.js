const mongoose = require("mongoose")
const schema = mongoose.Schema

const articleSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
    date:{type:Date ,default : Date.now()},
    numberOfLikes : {
        type : Number ,
        default : 0
    }
})

module.exports = mongoose.model("Article", articleSchema)