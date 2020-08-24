const { UserInputError, AuthenticationError } = require('apollo-server');

const Transaction = require('../model/transaction');
const Account = require('../model/account');



const fromCursorHash = string =>
    Buffer.from(string, 'base64').toString('ascii');

const toCursorHash = string => Buffer.from(string).toString('base64');

module.exports = {
    resolvers: {
        Query: {
            transactions: async (_, { id, cursor, limit = 10 }, { currentUser }) => {
                // Must be authenticated
                if (!currentUser) throw new AuthenticationError('you must be logged in')

                //find account in DB
                const account = await Account.findOne({ _id: id, owner: currentUser });

                const cursorOptions = cursor
                    ? {
                        createdAt: {
                            $lt: fromCursorHash(cursor),
                        },
                        forAccount: account
                    }
                    : { forAccount: account };

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

                // Get acount from DB
                const account = await Account.findOne({ name: args.name });
                if (!account) throw new UserInputError("account not found.");

                // Create new transaction
                const transaction = new Transaction({ ...args, forAccount: account });

                // Add transaction to account record.
                account.transactions.push(transaction)

                try {
                    await transaction.save()
                    await account.save()
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