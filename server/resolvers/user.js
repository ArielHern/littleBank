const { UserInputError } = require('apollo-server');
const bycrypt = require('bcrypt');

const User = require('../model/user');

module.exports = {
    resolvers: {
        Query: {
            me: (root, args, { currentUser }) => {
                return currentUser
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