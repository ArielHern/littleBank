const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('User', schema);