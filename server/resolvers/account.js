const { UserInputError, AuthenticationError } = require('apollo-server');

const Account = require('../model/account');
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
        Mutation: {
            createAccount: async (_, args, { currentUser }) => {
                //Must be log on to create account
                if (!currentUser) throw new AuthenticationError('you must be logged in')

                //Look for existing account in the DB,
                // if account send back a error message
                const account = Account.findOne({ owner: currentUser });
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

            deposit: async (_, args) => {
                const owner = await User.findOne({ name: args.owner });
                const account = await Account.findOne({ owner })
                account.balance = account.balance + args.amount;
                await account.save()
                    .catch((error) => {
                        throw new UserInputError(error.message);
                    });
                return account;
            },
            spend: async (_, args) => {
                const owner = await User.findOne({ name: args.owner });
                const account = await Account.findOne({ owner });
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
                return account;
            }
        }

    }
}
