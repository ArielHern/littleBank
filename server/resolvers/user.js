const { UserInputError } = require('apollo-server');
const bycrypt = require('bcrypt');

const User = require('../model/user');
const Transaction = require('../model/transaction');

module.exports = {
    resolvers: {
        Query: {
            me: async (_, args, { currentUser }) => {
                return await User.findById(currentUser._id);
            }
        },
        User: {
            transactions: async (_, args, { currentUser }) => {
                return await Transaction.find({ owner: currentUser });
            }
        },
        Mutation: {
            createUser: async (_, args) => {
                //password encryption
                const saltRounds = 10
                const passwordHash = await bycrypt.hash(args.password, saltRounds);

                //Create new user
                const user = new User({
                    username: args.username,
                    name: args.name,
                    passwordHash
                });

                await user.save()
                    .catch((error) => {
                        throw new UserInputError(error.message, {
                            invalidArgs: args
                        });
                    });
                return user;
            }
        }
    }
};