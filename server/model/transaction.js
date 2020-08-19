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
    forAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Transaction', schema);