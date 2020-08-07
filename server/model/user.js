const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')


const schema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: {
        type: String,
        minlength: 3,
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
});

module.exports = mongoose.model('User', schema);