const User = require('../model/user');
const Transaction = require('../model/transaction');
const Account = require('../model/account');

module.exports = {
    resolvers: {
        Query: {
            me: async (_, args, { currentUser }) => {
                return currentUser;
            }
        },
        User: {
            accounts: async (_, args, { currentUser }) => {
                return await Account.find({ owner: currentUser });
            }
        }
    }
};