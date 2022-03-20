const mongoose = require('mongoose');

const categorySxema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('category', categorySxema);