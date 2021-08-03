const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    tags: {
        type: Array,
        required: true
    }
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

module.exports = Post