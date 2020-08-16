const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    memo: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('TransactionCopy', schema);