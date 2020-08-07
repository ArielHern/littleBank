const { UserInputError } = require('apollo-server');

const Account = require('../model/account');
const User = require('../model/user');


module.exports = {
    resolver: {
        Query: {
            bankBalance: async (_, args) => {
                try {
                    const owner = await User.findOne({ name: args.owner });
                    const account = await Account.findOne({ owner });
                    return account.balance;
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }
            }
        },
        Mutation: {
            createAccount: async (_, args) => {
                const account = new Account({ ...args });
                let owner = await User.findOne({ name: args.owner })

                if (!owner) {
                    try {
                        owner = await new User({ name: args.owner }).save()
                    }
                    catch (error) {
                        throw new UserInputError(error.message, {
                            invalidArgs: args
                        });
                    }
                }
                account.owner = owner;
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
