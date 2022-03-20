const mongoose = require('mongoose');

const postSxema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    photo:{
        type: String
    },
    categories:{
        type: Array
    }
}, {timestamps: true})

module.exports = mongoose.model('post', postSxema);