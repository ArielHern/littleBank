const { UserInputError, AuthenticationError } = require('apollo-server');
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const Account = require('../model/account');
const Transaction = require('../model/transaction');

module.exports = {
    resolvers: {
        Query: {
            balance: async (_, args, { currentUser }) => {
                if (!currentUser) throw new AuthenticationError('you must be logged in')

                try {
                    const account = await Account.findOne({ owner: currentUser });
                    return account.balance;
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }

            }
        },
        Mutation: {
            createAccount: async (_, args, { currentUser }) => {
                //Must be log on to create account
                if (!currentUser) throw new AuthenticationError('you must be logged in')

                //Look for existing account in the DB,
                // if there is an account send back a error message
                let account = await Account.findOne({ owner: currentUser });
                if (account) throw new UserInputError('User already have an account')

                account = new Account({ ...args, owner: currentUser });
                try {
                    await account.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    });
                }
                return account;
            },

            deposit: async (_, args, { currentUser }) => {
                //Find account and update balance
                const account = await Account.findOne({ owner: currentUser });
                account.balance = account.balance + args.amount;

                //Save updated account
                await account.save()
                    .catch((error) => {
                        throw new UserInputError(error.message);
                    });

                // creating a new transaction and save it to DB
                const transaction = new Transaction({ ...args, type: "deposit", owner: currentUser });
                try {
                    await transaction.save()
                } catch (error) {
                    throw new UserInputError(error.message);
                }

                pubsub.publish('BALANCE_CHANGE', { balanceChanged: account });

                return account;
            },
            spend: async (_, args, { currentUser }) => {
                const account = await Account.findOne({ owner: currentUser });
                if (args.amount > account.balance) {
                    throw new UserInputError(
                        "decline: not enough funds in the account", {
                        invalidArgs: args.amount
                    }
                    )
                }
                account.balance = account.balance - args.amount;
                await account.save()
                    .catch((error) => {
                        throw new UserInputError(error.message);
                    });

                pubsub.publish('BALANCE_CHANGE', { balanceChanged: account });

                return account;
            }
        },
        Subscription: {
            balanceChanged: {
                subscribe: () => pubsub.asyncIterator(['BALANCE_CHANGE'])
            }
        }

    }
}
