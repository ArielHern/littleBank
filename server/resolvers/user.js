const User = require('../model/user');
const Transaction = require('../model/transaction');

module.exports = {
    resolvers: {
        Query: {
            me: async (_, args, { currentUser }) => {
                return await User.findById(currentUser._id);
            }
        },
        User: {
            transactions: async (_, args, { currentUser }) => {
                return await Transaction.find({ owner: currentUser });
            }
        }
    }
};