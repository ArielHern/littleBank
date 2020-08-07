const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    balance: Number,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Account', schema);