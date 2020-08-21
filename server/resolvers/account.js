const { UserInputError, AuthenticationError } = require('apollo-server');
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const Account = require('../model/account');
const Transaction = require('../model/transaction');
const User = require('../model/user');

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
        Account: {
            transactions: async (root) => {
                return await Transaction.find({ forAccount: root });
            }
        },

        Mutation: {
            createAccount: async (_, args, { currentUser }) => {
                //Must be log on to create account
                if (!currentUser) throw new AuthenticationError('you must be logged in')

                //Look for existing account in the DB,
                // if there is an account with the same name send back a error message
                let account = await Account.findOne({ name: args.name });

                if (account) {
                    if (account.owner === currentUser) throw new UserInputError('You already have account with same name');
                };

                account = new Account({ ...args, owner: currentUser });

                // Add account to user
                const user = await User.findOne({ username: currentUser.username });
                user.accounts.push(account)
                try {
                    await account.save()
                    await user.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    });
                }
                return account;
            },

            deposit: async (_, args, { currentUser }) => {
                if (!currentUser) throw new AuthenticationError('you must be logged in')

                //Find account and check for the owner
                const account = await Account.findOne({ name: args.name });
                if (account) {
                    if (!account.owner === currentUser) throw new UserInputError('account not found.');
                }
                //Update balance
                account.balance = account.balance + args.amount;

                // creating a new transaction and save it to DB
                const transaction = new Transaction({ ...args, type: "deposit", forAccount: account });
                account.transactions.push(transaction);

                try {
                    await transaction.save()
                    await account.save()
                } catch (error) {
                    throw new UserInputError(error.message);
                }

                pubsub.publish('BALANCE_CHANGE', { balanceChanged: account });
                pubsub.publish('TRANSACTION_CHANGED', { transactionChanged: transaction });

                return account;
            },
            spend: async (_, args, { currentUser }) => {
                if (!currentUser) throw new AuthenticationError('you must be logged in')

                //Find account and check for the owner
                const account = await Account.findOne({ name: args.name });
                if (account) {
                    if (!account.owner === currentUser) throw new UserInputError('account not found.');
                }

                if (args.amount > account.balance) {
                    throw new UserInputError(
                        "decline: not enough funds in the account", {
                        invalidArgs: args.amount
                    }
                    );
                };
                account.balance = account.balance - args.amount;

                // creating a new transaction and save it to DB
                const transaction = new Transaction({ ...args, type: "spend", forAccount: account });
                // add transaction to account
                account.transactions.push(transaction);
                try {
                    await transaction.save()
                    await account.save()
                } catch (error) {
                    throw new UserInputError(error.message);
                }

                pubsub.publish('BALANCE_CHANGE', { balanceChanged: account });
                pubsub.publish('TRANSACTION_CHANGED', { transactionChanged: transaction });

                return account;
            }
        },
        Subscription: {
            balanceChanged: {
                subscribe: () => pubsub.asyncIterator(['BALANCE_CHANGE'])
            },
            transactionChanged: {
                subscribe: () => pubsub.asyncIterator(['TRANSACTION_CHANGED'])
            }
        }

    }
}
