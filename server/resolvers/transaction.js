const { UserInputError } = require('apollo-server');

const Transaction = require('../model/transaction');
const User = require('../model/user');

module.exports = {
    resolvers: {
        Mutation: {
            createTrasaction: async (_, args, { currentUser }) => {
                // Must be authenticated
                if (!currentUser) throw new AuthenticationError('you must be logged in')

                // Get user from DB
                const user = await User.findOne({ name: currentUser.name });

                // Create new transaction
                const transaction = new Transaction({ ...args, owner: user });

                // Add transaction to users record.
                user.transactions.push(transaction)

                try {
                    await transaction.save()
                    await user.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    });
                }

                return transaction;
            }
        }
    }
};