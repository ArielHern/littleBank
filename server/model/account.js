const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    balance: {
        type: Number
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Account', schema);