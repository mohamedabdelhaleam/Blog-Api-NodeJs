const mongoose = require("mongoose")
const schema = mongoose.Schema

const articleSchema = new schema({
    title: String,
    body: String,
    author: String,
    date:{type:Date ,default : Date.now()},
    numberOfLikes : {
        type : Number ,
        default : 0
    }
})

const Article = mongoose.model("Article", articleSchema)

module.exports = Article