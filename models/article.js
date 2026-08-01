const mongoose = require("mongoose")
const Schema = mongoose.Schema

const articleSechema = new Schema({
    title: String,
    body: String,
    numberOfLikes: Number
})

const Article = mongoose.model("Article", articleSechema)
module.exports = Article