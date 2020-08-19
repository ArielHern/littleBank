const User = require('../model/user');
const Transaction = require('../model/transaction');

module.exports = {
    resolvers: {
        Query: {
            me: async (_, args, { currentUser }) => {
                return currentUser;
            }
        }
    }
};