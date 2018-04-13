const mongoose = require('mongoose');

// schema
let Post = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post must have title']
    },    
    permalink: {
        type: String,
        required: [true, 'Post must have permalink']
    },
    maintext: {
        type: String,
        required: [false]
    },

});

module.exports = mongoose.model('post', Post);
