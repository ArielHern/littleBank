const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    balance: Number,
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction'
        }
    ]
});

module.exports = mongoose.model('Account', schema);