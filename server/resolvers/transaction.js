const { UserInputError } = require('apollo-server');


const User = require('../model/user');
const Transaction = require('../model/transaction');

module.exports = {
    resolvers: {
        Mutation: {
            createTrasaction: async (_, args, { currentUser }) => {
                // Must be authenticated
                if (!currentUser) throw new AuthenticationError('you must be logged in')

                //Create new transaction
                const transaction = new Transaction({ ...args, owner: currentUser });

                await transaction.save()
                    .catch((error) => {
                        throw new UserInputError(error.message, {
                            invalidArgs: args
                        });
                    });
                return transaction;
            }
        }
    }
};