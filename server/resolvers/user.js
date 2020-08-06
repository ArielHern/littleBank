const { UserInputError } = require('apollo-server');

const User = require('../model/user');

module.exports = {
    resolver: {
        Mutation: {
            createUser: async (_, args) => {
                const user = new User({ ...args })
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