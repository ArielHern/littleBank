const { UserInputError } = require('apollo-server');

const Transaction = require('../model/transaction');
const User = require('../model/user');



const fromCursorHash = string =>
    Buffer.from(string, 'base64').toString('ascii');

const toCursorHash = string => Buffer.from(string).toString('base64');

module.exports = {
    resolvers: {
        Query: {
            transactions: async (_, { cursor, limit = 5 }, { currentUser }) => {
                // Must be authenticated
                if (!currentUser) throw new AuthenticationError('you must be logged in')

                const cursorOptions = cursor
                    ? {
                        createdAt: {
                            $lt: fromCursorHash(cursor),
                        },
                        owner: currentUser
                    }
                    : { owner: currentUser };

                const transactions = await Transaction.find(
                    cursorOptions,
                    null,
                    {
                        sort: { createdAt: -1 },
                        limit: limit + 1,
                    },
                );

                const hasNextPage = transactions.length > limit;
                const edges = hasNextPage ? transactions.slice(0, -1) : transactions

                return {
                    edges: edges,
                    pageInfo: {
                        hasNextPage,
                        endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString()),
                    },
                };
            }
        },
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